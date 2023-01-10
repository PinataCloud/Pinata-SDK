const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const libraryName = "pinata-sdk";

module.exports = (env) => {
    let outputFile, mode;

    console.log("env", env)

    mode = "production";

    outputFile = libraryName + ".min.js";
    // if (env === "build") {
    //     mode = "production";

    //     outputFile = libraryName + ".min.js";
    // } else {
    //     mode = "development";
    //     outputFile = libraryName + ".js";
    // }
    return {
        mode: mode,
        entry: [__dirname + "/src/index.tsx"],
        devtool: "inline-source-map",
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
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    loader: "babel-loader",
                    exclude: /(node_modules|bower_components)/,
                },
                // {
                //     test: /\.ts?$/,
                //     loader: 'eslint-loader',
                //     exclude: /node_modules/,
                // }
            ],
        },
        // target: 'node',
        node: {
            // fs: false,
            // process: false,
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            }),
            new webpack.ProvidePlugin({
                process: "process/browser",
            }),
            new BundleAnalyzerPlugin({ analyzerMode: "static" }),
        ],
        resolve: {
            modules: [path.resolve("./node_modules"), path.resolve("./src")],
            extensions: [".js", ".ts", ".tsx"],
            fallback: {
                stream: false,
                fs: false,
                process: false
            }
        },
    };
};
