const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = merge(common,{
    mode:"development",
    output: {
        path: path.resolve(__dirname, "./dist/js"),
        filename: "./[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template_osc.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
});