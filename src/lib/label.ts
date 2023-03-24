import type { labelsData } from '../interfaces'
import { labelsDataType } from '../interfaces'
import { Data } from './data'

export async function writeLabelDataInJson (labelJsonData: labelsData): Promise<string> {
  const data = new Data()
  return await data.init()
    .then(async resolve => await data.updateItemsWithNewItem(labelsDataType, labelJsonData, resolve))
}

export async function modifyLabelDataInJson (oldKey: string, labelJsonData: labelsData): Promise<string> {
  const data = new Data()
  return await data.init()
    .then(async resolve => await data.updateItemsWithModifiedItem(labelsDataType, oldKey, labelJsonData, resolve))
}

export async function removeLabelDataInJson (oldKey: string): Promise<string> {
  const data = new Data()
  return await data.init()
    .then(async resolve => await data.updateItemsWithRemovedItem(labelsDataType, oldKey, resolve))
}
