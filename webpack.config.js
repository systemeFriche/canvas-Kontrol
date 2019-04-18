const webpack = require("webpack");
const path = require("path");

let config = {
    entry: "./node_modules/osc/dist/osc.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./bundle.js"
    }
}

module.exports = config;