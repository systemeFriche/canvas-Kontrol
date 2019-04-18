const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./src/index_osc.js",
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "./objectsKontrol_osc.js"
    }
};

module.exports = config;