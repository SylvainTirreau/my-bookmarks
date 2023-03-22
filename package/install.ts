import { mkdirSync, appendFileSync, existsSync, rmSync } from 'fs'
import { config } from '../src/config'

function removeDistFolderIfExists () {
  if (existsSync(config.distributionFolder)) {
    rmSync(config.distributionFolder, { recursive: true, force: true })
  }
}

function createFolders () {
  const foldersPaths = [config.dataFolderDist, config.htmlTemplatesFolderDist, config.screenshotsFolderDist]
  for (const folderPath of foldersPaths) {
    try {
      mkdirSync(folderPath, { recursive: true })
    } catch (err: any) {
      console.log(`Cannot create ${folderPath}. Error: ${err.message}`)
    }
  }
}

function initFiles () {
  const filesPaths = [config.labelsFile, config.linksFile]
  for (const filePath of filesPaths) {
    try {
      appendFileSync(filePath, '{}')
    } catch (err: any) {
      console.log(`Cannot create ${filePath}. Error: ${err.message!}`)
    }
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  removeDistFolderIfExists()
  createFolders()
  initFiles()
}
