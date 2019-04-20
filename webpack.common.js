const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        main_oK_osc:"./src/index_osc.js",
        vendor:"./src/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "./[name].[contentHash].bundle.js"
    }
};