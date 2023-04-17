const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ESLintPlugin = require("eslint-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
function frontBundle(env) {
  let outputFile = "pinata-front-sdk.min.js";

  // }
  return {
    optimization: {
      minimize: false,
    },
    mode: "production",
    target: "web",
    entry: [__dirname + "/src/render.tsx"],
    devtool: "source-map",

    output: {
      path: __dirname + "/lib",
      filename: outputFile,
      library: "SubmarineWidget",
      libraryTarget: "umd",
      umdNamedDefine: true,
      globalObject: 'this',
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM",
      },
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "babel-loader",
          exclude: [/node_modules/, /types/],
        },
      ],
    },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new ESLintPlugin(),
      // new webpack.ProvidePlugin({
      //     Buffer: ['buffer', 'Buffer'],
      // }),
      // new webpack.ProvidePlugin({
      //     process: "process/browser",
      // }),
      //  new BundleAnalyzerPlugin({ analyzerMode: "static" }),
    ],
    resolve: {
      //  modules: ["src", "node_modules"],
      extensions: [".js", ".ts", ".tsx"],
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      },
    },
  };
}

module.exports = (env) => {
  return [frontBundle(env)];
};
