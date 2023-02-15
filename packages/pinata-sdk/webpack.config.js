const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const ESLintPlugin = require("eslint-webpack-plugin");
const libraryName = "pinata-sdk";

function serverBundle(env) {
    let outputFile = libraryName + ".min.js";

    return {
        mode: "production",
        entry: [__dirname + "/src/index.tsx"],
        devtool: "source-map",
        output: {
            path: __dirname + "/lib",
            filename: outputFile,
            library: "PinataSDK",
            libraryTarget: "umd",
            umdNamedDefine: true,
            globalObject: "this",
        },

        module: {
            rules: [
                // { test: /\.(js|jsx|ts|tsx)$/, loader: "ts-loader" },
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    loader: "babel-loader",
                    exclude: /(node_modules|bower_components)/,
                },
            ],
        },
        // target: 'node',

        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),

            new webpack.ProvidePlugin({
                process: "process/browser",
            }),
            new ESLintPlugin(),
        ],
        resolve: {
            modules: ["src", "node_modules"],
            extensions: [".js", ".ts", ".tsx"],
            fallback: {
                stream: false,
                fs: false,
                path: false,
                process: false,
            },
        },
    };
}

module.exports = (env) => {
    return [serverBundle(env)];
};
