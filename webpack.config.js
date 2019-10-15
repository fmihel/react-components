const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SOURCE_PATH = './components/demo/';
const PUBLIC_PATH = './demo/';
const TEMPLATE_PATH = './components/demo/template/';
const MEDIA_PATH = './components/demo/media/';
const PORT = 3000;

module.exports = {
    entry: `${SOURCE_PATH}index.js`,
    output: {
        path: path.resolve(__dirname, PUBLIC_PATH),
        filename: '[name].[contenthash].js',
    },
    resolve: {
        alias: {
            // components: path.resolve(__dirname, 'app/source/components/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: PUBLIC_PATH,
        port: PORT,
        liveReload: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new HtmlWebPackPlugin({
            template: `${TEMPLATE_PATH}index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin([
            { from: `${MEDIA_PATH}favicon.ico` },
        ]),
       
    ],
};
