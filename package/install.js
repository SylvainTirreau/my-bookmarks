"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function createFolders() {
    const path = 'dist/data/links';
    try {
        (0, fs_1.mkdirSync)(path, { recursive: true });
    }
    catch (err) {
        console.log(`Cannot create ${path}. Error: ${err.message}`);
    }
}
function initFiles() {
    const filesPaths = ['dist/data/labels.json', 'dist/data/links.json'];
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
    console.log(process.argv);
    createFolders();
    initFiles();
}
