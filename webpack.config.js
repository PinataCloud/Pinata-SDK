const webpack = require('webpack');
const path = require('path');

const libraryName = 'pinata-sdk';

module.exports = (env) => {
    let outputFile, mode;

    if (env === 'build') {
        mode = 'production';

        outputFile = libraryName + '.min.js';
    } else {
        mode = 'development';
        outputFile = libraryName + '.js';
    }
    return {
        mode: mode,
        entry: [ __dirname + '/src/index.ts'],
        devtool: 'inline-source-map',
        output: {
            path: __dirname + '/lib',
            filename: outputFile,
            library: libraryName,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            globalObject: "typeof self !== 'undefined' ? self : this"
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules|bower_components)/
             },
                // {
                //     test: /\.ts?$/,
                //     loader: 'eslint-loader',
                //     exclude: /node_modules/,
                      
                // }
            ]
        },
        target: 'node',
        node: {
            process: false
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            })
        ],
        resolve: {
            modules: [path.resolve('./node_modules'), path.resolve('./src')],
            extensions: ['.json', '.js', '.ts']
        }
    };
};
