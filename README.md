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

Quickly test that you can connect to the API with the following call:
```
pinata.testAuthentication(yourPinataApiKey, yourPinataSecretApiKey).then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

## Usage
Once you've set up your instance, using the Pinata SDK is easy. Simply call your desired function and handle the results of the promise.

* Pinning
  * [addHashToPinQueue](#addHashToPinQueue)
  * [pinFileToIPFS](#pinFileToIPFS)
  * [pinHashToIPFS](#pinHashToIPFS)
  * [pinJobs](#pinJobs)
  * [pinJSONToIPFS](#pinJSONToIPFS)
  * [removePinFromIPFS](#removePinFromIPFS)

* Data
  * [userPinnedDataTotal](#userPinnedDataTotal)
  * [userPinList](#userPinList)

#### `addHashToPinQueue`
addHashToPinQueue
##### Params
```
test
```

#### `pinFileToIPFS`
pinFileToIPFS

#### `pinHashToIPFS`
pinHashToIPFS

#### `pinJobs`
pinFileToIPFS

#### `pinJSONToIPFS`
pinFileToIPFS

#### `removePinFromIPFS`
pinFileToIPFS

#### `userPinnedDataTotal`
userPinnedDataTotal

#### `userPinList`
userPinList

## Misc
