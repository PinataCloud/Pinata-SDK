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
```javascript
const pinataSDK = require('@pinata/sdk');
const pinata = pinataClient('yourPinataApiKey', 'yourPinataSecretApiKey');
```

Quickly test that you can connect to the API with the following call:
```javascript
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
<a name="addHashToPinQueue"></a>
Adds a hash to Pinata's pin queue to be pinned asynchronously
##### `pinata.addHashToPinQueue(hashToPin, options)`
##### Params
* hashToPin - A string for a valid IPFS Hash (Also known as a CID)
* options (optional): A JSON object with the following keyvalues:
  * host_nodes (optional): An array of [multiaddresses for nodes](#hostnode-anchor) that are currently hosting the content to be pinned
  * pinataMetadata (optional): A JSON object with [optional metadata](#metadata-anchor) for the hash being pinned
##### Example Code
```javascript
const options = {
    host_nodes: [
        "/ip4/host_node_1_external_IP/tcp/4001/ipfs/host_node_1_peer_id",
        "/ip4/host_node_2_external_IP/tcp/4001/ipfs/host_node_2_peer_id",
    ],
    pinataMetadata: {
        name: MyCustomName,
        keyvalues: {
            customKey: "customValue",
            customKey2: "customValue2"
        }
    }
};
pinata.addHashToPinQueue('yourHashHere', options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
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

## Host Node Multiaddresses
<a name="hostnode-anchor"></a>
For endpoints that involve Pinata finding and pinning content that already resides on the IPFS network, you can help Pinata find your content faster by optionally providing us with the "multiaddresses" up to five host nodes that your content already resides on.

To find the multiaddresses of your nodes, simply run the following on your node's command line:
```
ipfs id
```
In the response, you'll want to focus on the "Addresses" array that's returned. Here you'll find the multiaddresses of your node. These multiaddresses are what other IPFS nodes use to connect to your node.

In the "Addresses" array, take note of the multiaddress that contains your external IP address. Not the local ipv4 "127.0.0.1" address or the local ipv6 "::1" address.

Here's an example of what a full external ipv4 multiaddress would look like (your IP address and node ID will differ):

`/ip4/123.456.78.90/tcp/4001/ipfs/QmAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQr`

⚠️ Please make sure every node provided is online. Pinata will attempt to connect to all nodes before pinning the content, and if any these nodes are offline, your request will eventually fail.

## Pinata Metadata
<a name="metadata-anchor"></a>
testing
