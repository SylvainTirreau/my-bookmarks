import { mkdirSync, appendFileSync, existsSync, rmSync } from "fs"
import { join } from 'path'
import { config } from './config'

function removeDistFolderIfExists() {
  if (existsSync(config.distFolder)) {
    rmSync(config.distFolder, {recursive: true, force: true})
  }
}

function createFolders() {
  const foldersPaths = [join(config.distFolder, 'data', 'links'), join(config.distFolder, 'assets', 'html')]
  for (const folderPath of foldersPaths) {
    try {
    mkdirSync(folderPath, {recursive: true})
  } catch (err: any) {
    console.log(`Cannot create ${folderPath}. Error: ${err.message}`)
  }
  }
}

function initFiles() {
  const filesPaths = [join(config.distFolder, 'data', 'labels.json'), join(config.distFolder, 'data', 'links.json')]
  for (const filePath of filesPaths) {
    try {
      appendFileSync(filePath, '{}',)
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