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

  writeDataToFile (filePath: string, data: dataContent, resolveMsg: string = ''): void {
    try {
      writeFileSync(filePath, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
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

  async writeFileWithNewData (itemType: dataType, givenData: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await new Promise<string>((resolve) => {
      if (itemType === labelsDataType) {
        this.writeDataToFile(config.labelsFile, mapToObject(this.labelsData))
        resolve(`Data (${JSON.stringify(mapToObject(this.labelsData))}) has been written in "${config.labelsFile}.`)
      } else if (itemType === linksDataType) {
        this.writeDataToFile(config.linksFile, mapToObject(this.linksData))
        resolve(`Data (${JSON.stringify(mapToObject(this.linksData))}) has been written in "${config.linksFile}.`)
      }
    })
  }

  async reloadNewData (itemType: dataType, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await this.getDataFromFile(itemType)
  }

  // TODO: insert related labels and links in final data (labelsData and LinksData <- rename those)
  async updateItemsWithNewItem (itemType: dataType, givenData: dataContent, resolveMsg: string = ''): Promise<string> {
    showResolveMessage(resolveMsg)
    return await this.insertItemInSavedData(itemType, givenData)
      .then(async resolve => await this.writeFileWithNewData(itemType, givenData, resolve))
      .then(async resolve => await this.reloadNewData(itemType, resolve))
  }
}

function jsonToMap (data: string): Map<any, any> {
  return new Map<any, any>(Object.entries(JSON.parse(data)))
}

function mapToObject (data: Map<any, any>): dataContent {
  return Object.fromEntries(data)
}
