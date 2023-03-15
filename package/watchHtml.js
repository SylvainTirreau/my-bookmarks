"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = require("chokidar");
const config_1 = require("../src/config");
const path_1 = require("path");
const utils_1 = require("./utils");
if (typeof require !== 'undefined' && require.main === module) {
    (0, chokidar_1.watch)((0, path_1.join)(config_1.config.sourceFolder, 'assets', 'html'))
        .on('add', path => {
        (0, utils_1.copyFileFromSrcToDist)(path);
    })
        .on('change', path => {
        (0, utils_1.copyFileFromSrcToDist)(path);
    })
        .on('unlink', path => {
        (0, utils_1.removeItemFromDist)(path);
    })
        .on('addDir', path => {
        (0, utils_1.createFolderToDist)(path);
    })
        .on('unlinkDir', path => {
        (0, utils_1.removeItemFromDist)(path);
    });
}
