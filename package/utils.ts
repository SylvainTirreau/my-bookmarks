import {config} from "./config"
import {copyFileSync, rmSync, mkdirSync, cpSync} from "fs";

export function copyFileFromSrcToDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distFolder)
  try {
    copyFileSync(srcPath, destPath)
    console.log(`"${srcPath}" copy to "${destPath}".`)
  } catch (err: any) {
    console.log(`Cannot copy "${srcPath}" to "${destPath}". Error: ${err.message}`)
  }
}

export function removeItemFromDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distFolder)
  try {
    rmSync(destPath, {recursive: true, force: true})
    console.log(`"${destPath}" removed.`)
  } catch (err: any) {
    console.log(`Cannot remove "${destPath}". Error: ${err.message}`)
  }
}

export function createFolderToDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distFolder)
  try {
    mkdirSync(destPath)
    console.log(`"${destPath}" created.`)
  } catch (err: any) {
    console.log(`Cannot create "${destPath}". Error: ${err.message}`)
  }
}

export function copyHtmlSrcFolderToDistFolder() {
  const distHtmlTemplatesPath = config.htmlTemplatesFolder.replace(config.sourceFolder, config.distFolder)
  removeItemFromDist(distHtmlTemplatesPath)
  try {
    cpSync(config.htmlTemplatesFolder, distHtmlTemplatesPath, {recursive: true, force: true})
    console.log(`Html assets are copied in "${config.distFolder}".`)
  } catch (err: any) {
    console.log(`Cannot copy html assets in "${config.distFolder}". Error: ${err.message}`)
  }
}

