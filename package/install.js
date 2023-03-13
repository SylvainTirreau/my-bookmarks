"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const distPath = 'dist';
function removeDistFolderIfExists() {
    // NB: if dist folder change, change it also in index.ts for static folder variable. Insert a global variable for that if needed.
    if ((0, fs_1.existsSync)(distPath)) {
        (0, fs_1.rmSync)(distPath, { recursive: true, force: true });
    }
}
function createFolders() {
    const foldersPaths = [(0, path_1.join)(distPath, 'data', 'links'), (0, path_1.join)(distPath, 'assets')];
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
    const filesPaths = [(0, path_1.join)(distPath, 'data', 'labels.json'), (0, path_1.join)(distPath, 'data', 'links.json')];
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
