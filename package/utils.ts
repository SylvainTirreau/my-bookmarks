import {config} from "../src/config"
import {copyFileSync, rmSync, mkdirSync, cpSync} from "fs";

export function copyFileFromSrcToDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distributionFolder)
  try {
    copyFileSync(srcPath, destPath)
    console.log(`"${srcPath}" copy to "${destPath}".`)
  } catch (err: any) {
    console.log(`Cannot copy "${srcPath}" to "${destPath}". Error: ${err.message}`)
  }
}

export function removeItemFromDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distributionFolder)
  try {
    rmSync(destPath, {recursive: true, force: true})
    console.log(`"${destPath}" removed.`)
  } catch (err: any) {
    console.log(`Cannot remove "${destPath}". Error: ${err.message}`)
  }
}

export function createFolderToDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distributionFolder)
  try {
    mkdirSync(destPath)
    console.log(`"${destPath}" created.`)
  } catch (err: any) {
    console.log(`Cannot create "${destPath}". Error: ${err.message}`)
  }
}

export function copyHtmlSrcFolderToDistFolder() {
  removeItemFromDist(config.htmlTemplatesFolderDist)
  try {
    cpSync(config.htmlTemplatesFolderSrc, config.htmlTemplatesFolderDist, {recursive: true, force: true})
    console.log(`Html assets are copied in "${config.distributionFolder}".`)
  } catch (err: any) {
    console.log(`Cannot copy "${config.htmlTemplatesFolderSrc}" in "${config.htmlTemplatesFolderDist}". Error: ${err.message}`)
  }
}

