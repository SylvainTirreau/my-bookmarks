import { mkdirSync, appendFileSync, existsSync, rmSync } from "fs"

function removeDistFolderIfExists() {
  const distPath = './dist'
  if (existsSync(distPath)) {
    rmSync(distPath, {recursive: true, force: true})
  }
}

function createFolders() {
  const path = './dist/data/links'
  try {
    mkdirSync(path, {recursive: true})
  } catch (err: any) {
    console.log(`Cannot create ${path}. Error: ${err.message}`)
  }
}

function initFiles() {
  const filesPaths = ['./dist/data/labels.json', './dist/data/links.json']
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