'use strict';

require('babel-register');

require("./mainserver");

global.__base = __dirname + '/';

var config = require("./webpack.config.js");
var webpack = require("webpack");
var path = require('path');
var fs = require('fs');

var WebpackDevServer = require("webpack-dev-server");

var express = require("express");

var compiler = webpack(config);

const assetsType = {
    styles: {
        head: {"Content-Type": "text/css"},
        dir: "css"
    },
    images: {
        head: {"Content-Type": "image/png"},
        dir: "images"
    },
    view: {
        head: {"Content-Type": "text/html" },
        dir: "view"
    }
};

function writeStaticFile(response, url, type) {

    let ret = assetsType[type];

    const cssPath = path.join(__dirname, 'public', 'assets', ret.dir , url);
    const file = fs.readFileSync(cssPath);

    response.writeHead(200, ret.head);
    response.write(file);
    response.end();
}

const server = new WebpackDevServer(compiler, {

    hot: true,

    clientLogLevel: "info",

    setup: function(app) {

        app.get('/assets/:type/:url', function(req, response) {
            writeStaticFile(response, req.params.url, req.params.type);
        });

        app.get('/assets/:type/:url', function(req, response) {
            writeStaticFile(response, req.params.url, req.params.type);
        });
    },

    stats: { colors: true },

    publicPath: "/js/"
});

server.listen(8080);