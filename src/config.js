"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = require("path");
// You just need to change that.
const sourceFolder = 'src';
const distributionFolder = 'dist';
// Does not need to change this.
exports.config = {
    sourceFolder,
    distributionFolder,
    linksFolderDist: (0, path_1.join)(distributionFolder, 'data', 'links'),
    labelsFolderDist: (0, path_1.join)(distributionFolder, 'data', 'labels'),
    screenshotsFolderDist: (0, path_1.join)(distributionFolder, 'assets', 'screenshots'),
    htmlTemplatesFolderSrc: (0, path_1.join)(sourceFolder, 'assets', 'html'),
    htmlTemplatesFolderDist: (0, path_1.join)(distributionFolder, 'assets', 'html'),
    labelsFile: (0, path_1.join)(distributionFolder, 'data', 'labels.json'),
    linksFile: (0, path_1.join)(distributionFolder, 'data', 'links.json')
};
