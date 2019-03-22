# Pinata SDK

Official NodeJS SDK for [Pinata](https://pinata.cloud)

## Overview

The Pinata NodeJS SDK provides the quickest / easiest path for interacting with the [Pinata API](https://pinata.cloud/documentation#GettingStarted).

## Installation
npm install --save pinata-client

## Getting started

1. Setting up the name of your library
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. Build your library
  * Run `yarn install` (recommended) or `npm install` to get the project's dependencies
  * Run `yarn build` or `npm run build` to produce minified version of your library.
3. Development mode
  * Having all the dependencies installed run `yarn dev` or `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `yarn test` or `npm run test`

## Scripts

* `yarn build` or `npm run build` - produces production version of your library under the `lib` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher
* `yarn test` or `npm run test` - well ... it runs the tests :)
* `yarn test:watch` or `npm run test:watch` - same as above but in a watch mode

## Readings

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)

## Misc

### An example of using dependencies that shouldn’t be resolved by webpack, but should become dependencies of the resulting bundle

In the following example we are excluding React and Lodash:

```js
{
  devtool: 'source-map',
  output: {
    path: '...',
    libraryTarget: 'umd',
    library: '...'
  },
  entry: '...',
  ...
  externals: {
    react: 'react'
    // Use more complicated mapping for lodash.
    // We need to access it differently depending
    // on the environment.
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  }
}
```
