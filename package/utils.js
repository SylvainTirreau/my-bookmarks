"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyHtmlSrcFolderToDistFolder = exports.createFolderToDist = exports.removeItemFromDist = exports.copyFileFromSrcToDist = void 0;
const config_1 = require("./config");
const fs_1 = require("fs");
function copyFileFromSrcToDist(srcPath) {
    const destPath = srcPath.replace(config_1.config.sourceFolder, config_1.config.distFolder);
    try {
        (0, fs_1.copyFileSync)(srcPath, destPath);
        console.log(`"${srcPath}" copy to "${destPath}".`);
    }
    catch (err) {
        console.log(`Cannot copy "${srcPath}" to "${destPath}". Error: ${err.message}`);
    }
}
exports.copyFileFromSrcToDist = copyFileFromSrcToDist;
function removeItemFromDist(srcPath) {
    const destPath = srcPath.replace(config_1.config.sourceFolder, config_1.config.distFolder);
    try {
        (0, fs_1.rmSync)(destPath, { recursive: true, force: true });
        console.log(`"${destPath}" removed.`);
    }
    catch (err) {
        console.log(`Cannot remove "${destPath}". Error: ${err.message}`);
    }
}
exports.removeItemFromDist = removeItemFromDist;
function createFolderToDist(srcPath) {
    const destPath = srcPath.replace(config_1.config.sourceFolder, config_1.config.distFolder);
    try {
        (0, fs_1.mkdirSync)(destPath);
        console.log(`"${destPath}" created.`);
    }
    catch (err) {
        console.log(`Cannot create "${destPath}". Error: ${err.message}`);
    }
}
exports.createFolderToDist = createFolderToDist;
function copyHtmlSrcFolderToDistFolder() {
    const distHtmlTemplatesPath = config_1.config.htmlTemplatesFolder.replace(config_1.config.sourceFolder, config_1.config.distFolder);
    removeItemFromDist(distHtmlTemplatesPath);
    try {
        (0, fs_1.cpSync)(config_1.config.htmlTemplatesFolder, distHtmlTemplatesPath, { recursive: true, force: true });
        console.log(`Html assets are copied in "${config_1.config.distFolder}".`);
    }
    catch (err) {
        console.log(`Cannot copy html assets in "${config_1.config.distFolder}". Error: ${err.message}`);
    }
}
exports.copyHtmlSrcFolderToDistFolder = copyHtmlSrcFolderToDistFolder;
