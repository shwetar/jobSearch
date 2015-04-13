'use strict';

var path = require("path");
var webpack = require("webpack");

module.exports = { 
    entry: [
            './public/javascripts/app.js'
    ],
    output: {
        path: path.join(__dirname, "public/build"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            { test: /\.html/, loader: "underscore-template-loader"}
        ]
    },
    resolve: {
        alias: {
            
        },
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules', 'bower_components']
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore"
        })
    ]
};