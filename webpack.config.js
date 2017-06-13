const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Production build
const isProd = process.env.NODE_ENV === 'production'; //true or false

// CSS Dev Build
const cssDev =  ['style-loader', 'css-loader?sourceMap', 'sass-loader'];

// CSS Prod Build
const cssProd = ExtractTextPlugin.extract({
    fallback: ['style-loader'],
    use: ['css-loader?url=false', 'resolve-url-loader', 'sass-loader?sourceMap']
})

const cssConfig = isProd ? cssProd : cssDev;

const config = {
    entry: {
        app: ['bootstrap-loader', './app/index.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [["es2015", {"modules": false}], "react"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.(jpe?g|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            { 
                test: /\.(woff2?|svg)$/, 
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
            },
            { 
                test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' 
            },
            { 
                test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' 
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: 'app/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: !isProd,
            allChunks: true
        })
    ]
}

module.exports = config;