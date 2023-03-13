"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = require("chokidar");
if (typeof require !== 'undefined' && require.main === module) {
    (0, chokidar_1.watch)('./src/assets/html').on('all', (event, path) => {
        console.log(event, path);
    });
}
