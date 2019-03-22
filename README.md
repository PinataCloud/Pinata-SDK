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
<br />

#### `addHashToPinQueue`
Adds a hash to Pinata's pin queue to be pinned asynchronously
##### `pinata.addHashToPinQueue(hashToPin, options)`
##### Params
* hashToPin - A string for a valid IPFS Hash (Also known as a CID)
* options (optional): A JSON object with the following keyvalues:
  * host_nodes (optional): An array of multiaddresses for nodes that are currently hosting the content to be pinned
  * pinataMetadata (optional): A JSON object with [optional metadata](#metadata-anchor) for the hash being pinned
```
{
    host_nodes: [
        /ip4/host_node_1_external_IP/tcp/4001/ipfs/host_node_1_peer_id,
        /ip4/host_node_2_external_IP/tcp/4001/ipfs/host_node_2_peer_id
    ],
    pinataMetadata: {
        name: 'exampleName',
        
    }
}
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

## Pinata Metadata
<a name="metadata-anchor"></a>
testing
