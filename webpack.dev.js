const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = merge(common,{
    mode:"development",
    devtool:"source-map",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].bundle.js"
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