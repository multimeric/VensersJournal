"use strict";

const fs = require("fs");
const path = require("path");

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        info.type = "file";
    }

    if (filename.includes("rules.json")) {
        console.log(info);
    }
    return info;
}

module.exports = {
  dirTree
}