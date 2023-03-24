import { readFileSync, writeFileSync } from 'node:fs'
import { config } from '../config'
import type { dataType, dataContent, linksData, labelsData } from '../interfaces'
import { labelsDataType, linksDataType } from '../interfaces'
import { showResolveMessage } from './utils'

export class Data {
  labelsData = new Map<any, any>()
  linksData = new Map<any, any>()

  async init (): Promise<string> {
    return await this.getDataFromFile('labels')
      .then(async (resolve: string) => await this.getDataFromFile('links', resolve))
  }

  async getDataFromFile (dataType: dataType, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve) => {
      let fileContent: string | Buffer
      let file: string
      if (dataType === 'labels') file = config.labelsFile
      else if (dataType === 'links') file = config.linksFile
      else file = 'none'

      try {
        fileContent = readFileSync(file)
        if (dataType === 'labels') this.labelsData = jsonToMap(fileContent.toString())
        else if (dataType === 'links') this.linksData = jsonToMap(fileContent.toString())
        resolve(`${file} is stored.`)
      } catch (err: any) {
        console.error(err)
        resolve(err.message)
      }
    })
  }

  getEntry (dataType: dataType, entryKey: string, resolveMsg: string = ''): Record<string, object> {
    showResolveMessage(resolveMsg)
    if (dataType === labelsDataType) {
      return this.labelsData.get(entryKey)
    } else if (dataType === linksDataType) {
      return this.linksData.get(entryKey)
    } else {
      return this.linksData.get(entryKey)
    }
  }

  async writeDataToFile (filePath: string, data: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve, reject) => {
      try {
        writeFileSync(filePath, JSON.stringify(data))
        resolve(`${filePath} written.`)
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }

  async insertItemInSavedData (itemType: dataType, givenData: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve) => {
      if (itemType === labelsDataType) {
        this.labelsData.set((givenData as labelsData).slug, givenData)
        resolve(`Data for "${(givenData as labelsData).slug}" (${JSON.stringify(givenData)}) has been inserted in saved data.`)
      } else if (itemType === linksDataType) {
        this.linksData.set((givenData as linksData).timestamp, givenData)
        resolve(`Data for "${(givenData as linksData).timestamp}" (${JSON.stringify(givenData)}) has been inserted in saved data.`)
      }
    })
  }

  async modifyItemInSavedData (itemType: dataType, oldKey: string, givenData: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve) => {
      if (itemType === labelsDataType) {
        this.labelsData.delete(oldKey)
        this.labelsData.set((givenData as labelsData).slug, givenData)
        resolve(`Data for "${(givenData as labelsData).slug}" (${JSON.stringify(givenData)}) has been modified in saved data.`)
      } else if (itemType === linksDataType) {
        this.linksData.delete(oldKey)
        this.linksData.set((givenData as linksData).timestamp, givenData)
        resolve(`Data for "${(givenData as linksData).timestamp}" (${JSON.stringify(givenData)}) has been modified in saved data.`)
      }
    })
  }

  async removeItemInSavedData (itemType: dataType, oldKey: string, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve) => {
      if (itemType === labelsDataType) {
        this.labelsData.delete(oldKey)
        resolve(`${oldKey} has been removed in saved data.`)
      } else if (itemType === linksDataType) {
        this.linksData.delete(oldKey)
        resolve(`${oldKey} has been removed in saved data.`)
      }
    })
  }

  async writeFileWithNewData (itemType: dataType, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve) => {
      if (itemType === labelsDataType) {
        this.writeDataToFile(config.labelsFile, mapToObject(this.labelsData))
          .then(() => {
            resolve(`Data (${JSON.stringify(mapToObject(this.labelsData))}) has been written in "${config.labelsFile}.`)
          })
          .catch(() => {
            resolve(`Data (${JSON.stringify(mapToObject(this.labelsData))}) has not been written in "${config.labelsFile}.`)
          })
      } else if (itemType === linksDataType) {
        this.writeDataToFile(config.linksFile, mapToObject(this.linksData))
          .then(() => {
            resolve(`Data (${JSON.stringify(mapToObject(this.linksData))}) has been written in "${config.linksFile}.`)
          })
          .catch(() => {
            resolve(`Data (${JSON.stringify(mapToObject(this.linksData))}) has not been written in "${config.linksFile}.`)
          })
      }
    })
  }

  async reloadNewData (itemType: dataType, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await this.getDataFromFile(itemType)
  }

  async updateItemsWithNewItem (itemType: dataType, givenData: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await this.insertItemInSavedData(itemType, givenData)
      .then(async resolve => await this.writeFileWithNewData(itemType, resolve))
      .then(async resolve => await this.reloadNewData(itemType, resolve))
  }

  async updateItemsWithModifiedItem (itemType: dataType, oldKey: string, givenData: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await this.modifyItemInSavedData(itemType, oldKey, givenData)
      .then(async resolve => await this.writeFileWithNewData(itemType, resolve))
      .then(async resolve => await this.reloadNewData(itemType, resolve))
  }

  async updateItemsWithRemovedItem (itemType: dataType, oldKey: string, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await this.removeItemInSavedData(itemType, oldKey)
      .then(async resolve => await this.writeFileWithNewData(itemType, resolve))
      .then(async resolve => await this.reloadNewData(itemType, resolve))
  }
}

export function jsonToMap (data: string): Map<any, any> {
  return new Map<any, any>(Object.entries(JSON.parse(data)))
}

export function mapToObject (data: Map<any, any>): dataContent {
  return Object.fromEntries(data)
}
