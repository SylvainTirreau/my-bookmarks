import { watch } from 'chokidar'
import { config } from '../src/config'
import { join } from 'path'
import {copyFileFromSrcToDist, createFolderToDist, removeItemFromDist} from "./utils";

if (typeof require !== 'undefined' && require.main === module) {
  watch(join(config.sourceFolder, 'assets', 'html'))
    .on('add', path => {
      copyFileFromSrcToDist(path)
    })
    .on('change', path => {
      copyFileFromSrcToDist(path)
    })
    .on('unlink', path => {
      removeItemFromDist(path)
    })
    .on('addDir', path => {
      createFolderToDist(path)
    })
    .on('unlinkDir', path => {
      removeItemFromDist(path)
    })
}