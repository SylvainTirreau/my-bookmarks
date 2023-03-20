import { readFileSync, writeFileSync } from 'node:fs'
import { config } from '../config'
import type { dataType } from '../interfaces'
import { labelsDataType, linksDataType } from '../interfaces'

export class Data {
  labelsData = new Map<any, any>()
  linksData = new Map<any, any>()

  constructor () {
    this.getDataFromFile('labels')
    this.getDataFromFile('links')
  }

  getDataFromFile (dataType: dataType): void {
    let fileContent: string | Buffer
    let file: string
    if (dataType === 'labels') {
      file = config.labelsFile
    } else if (dataType === 'links') {
      file = config.linksFile
    } else {
      file = 'none'
    }
    const readLabelsFile = new Promise((resolve, reject) => {
      try {
        fileContent = readFileSync(file)
      } catch (err) {
        console.error(err)
        reject(err)
      }
      resolve(`${dataType} file read.`)
    })
    readLabelsFile
      .then((resolve) => {
        console.log(resolve)
        this.labelsData = new Map<any, any>(Object.entries(JSON.parse(fileContent.toString())))
      })
      .then(() => {
        console.log(`${dataType} file content store in ${dataType} data.`)
      })
      .catch(reject => {
        console.log(reject)
      })
  }

  writeDataToFile (filePath: string, data: Map<any, any>): void {
    try {
      writeFileSync(filePath, JSON.stringify(Object.fromEntries(data)))
    } catch (err) {
      console.error(err)
    }
  }

  insertItemInItemsJson (itemId: string, itemType: dataType): void {
    let itemData: Map<any, any>
    let filePath: string
    if (itemType === labelsDataType) {
      itemData = this.labelsData
      filePath = config.labelsFile
    } else if (itemType === linksDataType) {
      itemData = this.linksData
      filePath = config.linksFile
    }
    const setNewLink = new Promise((resolve) => {
      itemData.set(itemId, [])
      resolve(`Insert "${itemId}" in ${filePath}.`)
    })
    void setNewLink
      .then(() => {
        this.writeDataToFile(filePath, itemData)
        console.log(`Write file "${filePath}".`)
      })
      .then(() => {
        this.getDataFromFile(itemType)
        console.log(`Get data from new file "${filePath}".`)
      })
  }
}
