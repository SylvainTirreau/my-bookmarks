"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("./config");
function removeDistFolderIfExists() {
    if ((0, fs_1.existsSync)(config_1.config.distFolder)) {
        (0, fs_1.rmSync)(config_1.config.distFolder, { recursive: true, force: true });
    }
}
function createFolders() {
    const foldersPaths = [(0, path_1.join)(config_1.config.distFolder, 'data', 'links'), (0, path_1.join)(config_1.config.distFolder, 'assets', 'html')];
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
    const filesPaths = [(0, path_1.join)(config_1.config.distFolder, 'data', 'labels.json'), (0, path_1.join)(config_1.config.distFolder, 'data', 'links.json')];
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
