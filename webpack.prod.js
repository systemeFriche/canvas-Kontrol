const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = merge(common,{
    mode:"production",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].[contentHash].bundle.js"
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "css/[name].[contentHash].css"}),
        new HtmlWebpackPlugin({
            filename:"index_osc.html",
            template: "./src/template_osc.html"
        }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
});