const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        main_oK_osc:"./src/index_osc.js"
    },
    resolve: {
        alias: {
            //'osc': path.join(__dirname, 'node_modules/osc/dist/osc.js'),
            'osc-browser': path.join(__dirname, 'node_modules/osc/dist/osc-browser.js')
        }
    },
};