import { join } from 'path'

// You just need to change that.
const sourceFolder = 'src'
const distributionFolder = 'dist'

// Does not need to change this.
export const config = {
  sourceFolder,
  distributionFolder,
  dataFolderDist: join(distributionFolder, 'data'),
  screenshotsFolderDist: join(distributionFolder, 'assets', 'screenshots'),
  htmlTemplatesFolderSrc: join(sourceFolder, 'assets', 'html'),
  htmlTemplatesFolderDist: join(distributionFolder, 'assets', 'html'),
  labelsFile: join(distributionFolder, 'data', 'labels.json'),
  linksFile: join(distributionFolder, 'data', 'links.json')
}
