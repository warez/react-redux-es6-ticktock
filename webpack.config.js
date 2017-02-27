var path = require('path');
var webpack = require('webpack');

var cdn = (process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
    entry: {
        ticktock: getEntrySources([path.join(__dirname, 'public', 'src', 'client', 'ticktock.jsx')]),
        ticktockFlux: getEntrySources([path.join(__dirname, 'public', 'src', 'client', 'ticktockflux.jsx')])
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public', 'dist')
    },

    devServer: {
        contentBase: './dist',
        hot: true
    },

    resolve: {
        alias: {
            'styles': path.join(__dirname, 'public', 'assets', 'css'),
            'ttflux': path.join(__dirname, 'public', 'src', 'ttflux'),
        }
    },

    //devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }],

        rules: [
            {
                test: /\.css?$/,
                loaders: [ 'style-loader', 'css-loader' ],
                include: __dirname
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ]
};