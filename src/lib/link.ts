import {readFileSync} from "node:fs"
import {join} from 'path'
import {get} from 'node:https'
import {parse} from 'node-html-parser'
import {linkJsonData, newLinkFormData} from "../interfaces"
import {createWebsiteScreenshot} from "./browser"

/**
 * Add, get, remove, or modify link
 */
export class Link {
  labelsData: any
  linksData: any

  constructor() {
    this.labelsData = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'labels.json')).toString())
    this.linksData = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'links.json')).toString())
  }

  // Private function (no testable)
  private _writeLinkDataInJson(linkJsonData: linkJsonData) {
    console.log(linkJsonData)
    // Créer un fichier pour lien contenant les infos.
    // Créer une entrée dans link data.
  }

  // Public functions (testable)
  // Créer une interface
  async createLinkData(newLinkFormData: newLinkFormData) {
    let htmlText = ''
    get(newLinkFormData.url, res => {
      res.on('data', (data: any) => {
        htmlText += data.toString()
      })
      res.on('end', async (data: any) => {
        const he = require('he')
        const date = new Date()
        const homePage = parse(he.decode(htmlText))
        const titleTag = (homePage.getElementsByTagName('title').length === 0) ? 'Pas de titre sur la cible.' : homePage.getElementsByTagName('title').toString()
        const title = (newLinkFormData.title === '') ? titleTag.replace('<title>', '').replace('</title>', '') : newLinkFormData.title
        const descriptionMetaTag = homePage.querySelector('meta[name="description"]')
        let description: string | undefined
        if (descriptionMetaTag === null) {
          description = "Pas de description sur la cible."
        } else {
          description = (newLinkFormData.description === '') ? descriptionMetaTag.getAttribute('content') : newLinkFormData.description
        }
        const timestamp = (Date.parse(date.toString()) / 1000).toString()
        const screenshotCreated = createWebsiteScreenshot(newLinkFormData.url, timestamp)
        let screenshotUrl: string
        screenshotCreated
          .then((created) => {
            screenshotUrl = (created) ? join('dist', 'assets', 'screenshots', `${timestamp}.png`) : 'none'
          })
          .then(() => {
            this._writeLinkDataInJson({
              url: newLinkFormData.url,
              title: title,
              description: description,
              thumbnailPath: screenshotUrl,
              timestamp: timestamp.toString()
            })
          })
      })
    }).on('error', (err: Error) => {
      if (err.message.includes('ENOTFOUND')) {
        console.log(`Le site "${newLinkFormData.url}" n'a pas été trouvé. Retourner la valeur à la page.`)
      } else {
        console.log(err)
      }
    })
  }

  removeLinkData(timestamp: string) {

  }

  getLinkData(timestamp: string) {

  }

  modifyLinkData(timestamp: string) {

  }

}

if (typeof require !== 'undefined' && require.main === module) {
  const testLink = new Link()
  testLink.createLinkData({
    url: 'https://sylvain.tirreau.fr',
    title: '',
    description: ''
  })
}