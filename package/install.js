"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const config_1 = require("../src/config");
function removeDistFolderIfExists() {
    if ((0, fs_1.existsSync)(config_1.config.distributionFolder)) {
        (0, fs_1.rmSync)(config_1.config.distributionFolder, { recursive: true, force: true });
    }
}
function createFolders() {
    const foldersPaths = [config_1.config.dataFolderDist, config_1.config.htmlTemplatesFolderDist, config_1.config.screenshotsFolderDist];
    for (const folderPath of foldersPaths) {
        try {
            (0, fs_1.mkdirSync)(folderPath, { recursive: true });
        }
        catch (err) {
            console.log(`Cannot create ${folderPath}. Error: ${err.message}`);
        }
    }
}
function initFiles() {
    const filesPaths = [config_1.config.labelsFile, config_1.config.linksFile];
    for (const filePath of filesPaths) {
        try {
            (0, fs_1.appendFileSync)(filePath, '{}');
        }
        catch (err) {
            console.log(`Cannot create ${filePath}. Error: ${err.message}`);
        }
    }
}
if (typeof require !== 'undefined' && require.main === module) {
    removeDistFolderIfExists();
    createFolders();
    initFiles();
}
