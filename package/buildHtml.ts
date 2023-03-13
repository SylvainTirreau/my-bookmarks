import {copyHtmlSrcFolderToDistFolder} from "./utils";

if (typeof require !== 'undefined' && require.main === module) {
  copyHtmlSrcFolderToDistFolder()
}