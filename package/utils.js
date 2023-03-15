"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyHtmlSrcFolderToDistFolder = exports.createFolderToDist = exports.removeItemFromDist = exports.copyFileFromSrcToDist = void 0;
const config_1 = require("../src/config");
const fs_1 = require("fs");
function copyFileFromSrcToDist(srcPath) {
    const destPath = srcPath.replace(config_1.config.sourceFolder, config_1.config.distributionFolder);
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
    const destPath = srcPath.replace(config_1.config.sourceFolder, config_1.config.distributionFolder);
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
    const destPath = srcPath.replace(config_1.config.sourceFolder, config_1.config.distributionFolder);
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
    removeItemFromDist(config_1.config.htmlTemplatesFolderDist);
    try {
        (0, fs_1.cpSync)(config_1.config.htmlTemplatesFolderSrc, config_1.config.htmlTemplatesFolderDist, { recursive: true, force: true });
        console.log(`Html assets are copied in "${config_1.config.distributionFolder}".`);
    }
    catch (err) {
        console.log(`Cannot copy "${config_1.config.htmlTemplatesFolderSrc}" in "${config_1.config.htmlTemplatesFolderDist}". Error: ${err.message}`);
    }
}
exports.copyHtmlSrcFolderToDistFolder = copyHtmlSrcFolderToDistFolder;
