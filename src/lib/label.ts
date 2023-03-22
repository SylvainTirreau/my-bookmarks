import type { labelData } from '../interfaces'
import { labelsDataType } from '../interfaces'
import { Data } from './data'

export async function writeLabelDataInJson (labelJsonData: labelData): Promise<string> {
  const data = new Data()
  return await data.init()
    .then(async resolve => await data.updateItemsWithNewItem(labelsDataType, labelJsonData, resolve))
}
