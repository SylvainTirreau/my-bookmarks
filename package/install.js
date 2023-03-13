"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function removeDistFolderIfExists() {
    console.log('1');
    const distPath = './dist';
    if ((0, fs_1.existsSync)(distPath)) {
        (0, fs_1.rmSync)(distPath, { recursive: true, force: true });
        console.log('2');
    }
}
function createFolders() {
    console.log('3');
    const path = './dist/data/links';
    try {
        (0, fs_1.mkdirSync)(path, { recursive: true });
        console.log('4');
    }
    catch (err) {
        console.log(`Cannot create ${path}. Error: ${err.message}`);
    }
}
function initFiles() {
    console.log('5');
    const filesPaths = ['./dist/data/labels.json', './dist/data/links.json'];
    for (const filePath of filesPaths) {
        try {
            (0, fs_1.appendFileSync)(filePath, '{}');
            console.log('6');
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
