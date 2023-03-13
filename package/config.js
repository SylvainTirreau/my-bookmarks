"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = require("path");
exports.config = {
    sourceFolder: 'src',
    distFolder: 'dist',
    htmlTemplatesFolder: (0, path_1.join)('src', 'assets', 'html')
};
