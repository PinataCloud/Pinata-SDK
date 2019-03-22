<img src="https://cdn-images-1.medium.com/max/1200/1*BTGStLRXsQUbkp0t-oxJhQ.png" width="200" />

# Pinata SDK

Official NodeJS SDK for [Pinata](https://pinata.cloud)

## Overview

The Pinata NodeJS SDK provides the quickest / easiest path for interacting with the [Pinata API](https://pinata.cloud/documentation#GettingStarted).

## Installation
```
npm install --save @pinata/sdk
```

## Setup
To start, simply require the Pinata SDK and set up an instance with your Pinata API Keys. Don't know what your keys are? Check out your [Account Page](https://pinata.cloud/account).
```
const pinataSDK = require('@pinata/sdk');
const pinata = pinataClient('yourPinataApiKey', 'yourPinataSecretApiKey');
```

## Usage
Once you've set up your instance, using the Pinata SDK is easy. Simply call your desired function and handle the results of the promise. Here's an example of how you would test your authentication keys with the SDK.
```
pinata.testAuthentication(yourPinataApiKey, yourPinataSecretApiKey).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
```

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
