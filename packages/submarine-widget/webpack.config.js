const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

function frontBundle(env) {
  let outputFile = "pinata-front-sdk.min.js";

  // }
  return {
    mode: "production",
    target: "web",
    entry: [__dirname + "/src/render.tsx"],
    devtool: "source-map",
    output: {
      path: __dirname + "/lib",
      filename: outputFile,
    },
    externals: {
      react: "React",
      "react-dom/client": "ReactDOMClient",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "babel-loader",
          exclude: [/node_modules/],
        },
      ],
    },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      // new webpack.ProvidePlugin({
      //     Buffer: ['buffer', 'Buffer'],
      // }),
      // new webpack.ProvidePlugin({
      //     process: "process/browser",
      // }),
      // new BundleAnalyzerPlugin({ analyzerMode: "static" }),
    ],
    resolve: {
      //  modules: ["src", "node_modules"],
      extensions: [".js", ".ts", ".tsx"],
    },
  };
}

module.exports = (env) => {
  return [frontBundle(env)];
};
