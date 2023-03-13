import { mkdirSync, appendFileSync, existsSync, rmSync } from "fs"
import { join } from 'path'

const distPath = 'dist'

function removeDistFolderIfExists() {
  // NB: if dist folder change, change it also in index.ts for static folder variable. Insert a global variable for that if needed.
  if (existsSync(distPath)) {
    rmSync(distPath, {recursive: true, force: true})
  }
}

function createFolders() {
  const foldersPaths = [join(distPath, 'data', 'links'), join(distPath, 'assets')]
  for (const folderPath of foldersPaths) {
    try {
    mkdirSync(folderPath, {recursive: true})
  } catch (err: any) {
    console.log(`Cannot create ${folderPath}. Error: ${err.message}`)
  }
  }

}

function initFiles() {
  const filesPaths = [join(distPath, 'data', 'labels.json'), join(distPath, 'data', 'links.json')]
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