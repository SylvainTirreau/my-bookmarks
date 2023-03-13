import { config } from "./config"
import { copyFileSync, rmSync, mkdirSync } from "fs";

export function copyFileFromSrcToDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distFolder)
  try {
    copyFileSync(srcPath, destPath)
    console.log(`"${srcPath}" copy to "${destPath}".`)
  } catch (err:any) {
    console.log(`Cannot copy "${srcPath}" to "${destPath}". Error: ${err.message}`)
  }
}

export function removeItemFromDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distFolder)
  try {
    rmSync(destPath)
    console.log(`"${destPath}" removed.`)
  } catch (err:any) {
    console.log(`Cannot remove "${destPath}". Error: ${err.message}`)
  }
}

export function createFolderToDist(srcPath: string) {
  const destPath = srcPath.replace(config.sourceFolder, config.distFolder)
  try {
    mkdirSync(destPath)
    console.log(`"${destPath}" created.`)
  } catch (err:any) {
    console.log(`Cannot create "${destPath}". Error: ${err.message}`)
  }
}
