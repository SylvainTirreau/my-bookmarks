import type { labelData, resultPromiseForFront } from '../interfaces'
import { Data } from './data'
import { join } from 'path'
import { config } from '../config'

function writeLabelDataInJson (labelJsonData: labelData): void {
  // Create error handler.
  const data = new Data()
  const labelData = new Map<any, any>(Object.entries(labelJsonData))
  data.writeDataToFile(join(config.labelsFolderDist, `${labelJsonData.slug}.json`), labelData)
  data.insertItemInItemsJson(labelJsonData.slug, 'labels')
}

export async function createLabelDataFile (labelData: labelData): Promise<resultPromiseForFront> {
  return await new Promise<resultPromiseForFront>((resolve, reject) => {
    const result: resultPromiseForFront = { success: false, message: '' }
    try {
      writeLabelDataInJson(labelData)
      result.success = true
      result.message = `Label ${labelData.name} a été créé.`
      resolve(result)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
