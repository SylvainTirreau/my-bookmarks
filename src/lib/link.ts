import { join } from 'path'
import { get } from 'node:https'
import { parse } from 'node-html-parser'
import type { linkData, newLinkFormData, resultPromiseForFront } from '../interfaces'
import { createWebsiteScreenshot } from './browser'
import { config } from '../config'
import { Data } from './data'
import * as he from 'he'

function writeLinkDataInJson (linkJsonData: linkData): void {
  const data = new Data()
  const linkData = new Map<any, any>(Object.entries(linkJsonData))
  data.writeDataToFile(join(config.linksFolderDist, `${linkJsonData.timestamp}.json`), linkData)
  data.insertItemInItemsJson(linkJsonData.timestamp, 'links')
}

export async function createLinkDataFile (newLinkFormData: newLinkFormData): Promise<resultPromiseForFront> {
  return await new Promise<resultPromiseForFront>((resolve, reject) => {
    const result: resultPromiseForFront = { success: false, message: '' }
    let htmlText = ''
    get(newLinkFormData.url, res => {
      res.on('data', (data: any) => {
        htmlText += data.toString() as string
      })
      res.on('end', () => {
        const date = new Date()
        const homePage = parse(he.decode(htmlText))
        const titleTag = (homePage.getElementsByTagName('title').length === 0) ? 'Pas de titre sur la cible.' : homePage.getElementsByTagName('title').toString()
        const title = (newLinkFormData.title === '') ? titleTag.replace('<title>', '').replace('</title>', '') : newLinkFormData.title
        const descriptionMetaTag = homePage.querySelector('meta[name="description"]')
        let description: string | undefined
        if (descriptionMetaTag === null) {
          description = 'Pas de description sur la cible.'
        } else {
          description = (newLinkFormData.description === '') ? descriptionMetaTag.getAttribute('content') : newLinkFormData.description
        }
        const timestamp = (Date.parse(date.toString()) / 1000).toString()
        const screenshotCreated = createWebsiteScreenshot(newLinkFormData.url, timestamp)
        let screenshotUrl: string
        void screenshotCreated
          .then((created) => {
            screenshotUrl = (created) ? join(config.screenshotsFolderDist, `${timestamp}.png`) : 'none'
          })
          .then(() => {
            const linkData = {
              url: newLinkFormData.url,
              title,
              description,
              thumbnailPath: screenshotUrl,
              timestamp: timestamp.toString()
            }
            writeLinkDataInJson(linkData)
          })
          .then(() => {
            result.success = true
            result.message = `Capture écran effectuée pour l'url "${newLinkFormData.url}" et enregistrée dans ${screenshotUrl}`
            resolve(result)
          })
      })
    }).on('error', (err: Error) => {
      result.success = false
      if (err.message.includes('ENOTFOUND')) {
        result.message = `Le site "${newLinkFormData.url}" n'a pas été trouvé.`
        reject(result)
      } else {
        result.message = err.toString()
        reject(result)
      }
    })
  })
}

if (typeof require !== 'undefined' && require.main === module) {
  void createLinkDataFile({
    url: 'https://sylvain.tirreau.fr',
    title: '',
    description: ''
  })
}
