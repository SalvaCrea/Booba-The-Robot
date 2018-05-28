var path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./index.html",
    filename: "index.html"
});

module.exports = {
    mode: 'development',
    entry: ['./app-front.jsx', './web/styles/index.scss'],

    module: {
        rules: [
            /**
             * JSX Rules
             */
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['react']
                    }
                }
            },
            /**
             *  Sass Rules
             */
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    },
    plugins: [
        htmlPlugin
    ]
};