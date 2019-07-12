const webpack = require('webpack');
const path = require('path');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const htmldiff = {
    entry: {
        htmldiff: ['./src/Diff.js'],
    },

    output: {
        filename: 'htmldiff.min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        library: 'HtmlDiff',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UnminifiedWebpackPlugin()
    ],

    optimization: {
        minimize: true
    }
};

const polyfill = {
    entry: {
        'babel-polyfill': ['@babel/polyfill'],
    },

    output: {
        filename: 'babel-polyfill.min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        library: 'BabelPolyfill',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UnminifiedWebpackPlugin()
    ],

    optimization: {
        minimize: true
    }
};

module.exports = [ htmldiff, polyfill ];