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
To start, simply require the Pinata SDK and set up an instance with your Pinata API Keys or your JWT key. Don't know what your keys are? Check out your [Account Page](https://pinata.cloud/account).
In the example below we provided with 3 ways to call the pinata SDK.

```javascript
// Use the api keys by providing the strings directly 
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK('yourPinataApiKey', 'yourPinataSecretApiKey');
```

```javascript
// Use the api keys by specifying your api key and api secret
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataApiKey: 'yourPinataApiKey', pinataSecretApiKey: 'yourPinataSecretApiKey' });

```

```javascript
// Use the JWT key
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: 'yourPinataJWTKey'});
```

Quickly test that you can connect to the API with the following call:
```javascript
pinata.testAuthentication().then((result) => {
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
  * [hashMetadata](#hashMetadata-anchor)
  * [pinByHash](#pinByHash-anchor)
  * [pinFileToIPFS](#pinFileToIPFS-anchor)
  * [pinFromFS](#pinFromFS-anchor)
  * [pinJobs](#pinJobs-anchor)
  * [pinJSONToIPFS](#pinJSONToIPFS-anchor)
  * [unpin](#unpin-anchor)
  * [userPinPolicy](#userPinPolicy-anchor)

* Data
  * [testAuthentication](#testAuthentication-anchor)
  * [pinList](#pinList-anchor)
  * [getFilesByCount](#getFilesByCount-anchor)
  * [userPinnedDataTotal](#userPinnedDataTotal-anchor)
<br />

<a name="hashMetadata-anchor"></a>
### `hashMetadata`
Allows the user to change the name and keyvalues associated with content pinned to Pinata.
Changes made via this endpoint only affect the metadata for the hash passed in. [Metadata](#metadata-anchor) is specific to Pinata and does not modify the actual content stored on IPFS in any way. It is simply a convenient way of keeping track of what content you have stored.

##### `pinata.hashMetadata(ipfsPinHash, metadata)`
##### Params
* `ipfsPinHash` - A string for a valid IPFS Hash that you have pinned on Pinata.
* `metadata` A JSON object containing the following:
  * `name` (optional) - A new name that Pinata will associate with this particular hash. 
  * `keyvalues` (optional) - A JSON object with the updated keyvalues you want associated with the hash provided (see more below)
  
###### Adding or modifying keyvalues
To add or modify existing keyvalues, simply provide them in the following format for the keyvalues object:
```
keyvalues: {
    newKey: 'newValue', //this adds a keyvalue pair
    existingKey: 'newValue' //this modifies the value of an existing key if that key already exists
}
```

###### Removing keyvalues
To remove a keyvalue pair, simply provide null as the value for an existing key like so:
```
keyvalues: {
    existingKeyToRemove: null //this removes a keyvalue pair
}
```

#### Response
If the operation is successful, you will receive back an "OK" REST 200 status.

##### Example Code
```javascript
const metadata = {
    name: 'new custom name',
    keyvalues: {
        newKey: 'newValue',
        existingKey: 'newValue',
        existingKeyToRemove: null
    }
};
pinata.hashMetadata('yourHashHere', metadata).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="pinByHash-anchor"></a>
### `pinByHash`
Adds a hash to Pinata's pin queue to be pinned asynchronously. For the synchronous version of this operation see: [pinHashToIPFS](#pinHashToIPFS-anchor)

##### `pinata.pinByHash(hashToPin, options)`
##### Params
* `hashToPin` - A string for a valid IPFS Hash (Also known as a CID)
* `options` (optional): A JSON object that can contain following keyvalues:
  * `pinataMetadata` (optional): A JSON object with [optional metadata](#metadata-anchor) for the hash being pinned
  * `pinataOptions`
     * `hostNodes` (optional): An array of [multiaddresses for nodes](#hostNode-anchor) that are currently hosting the content to be pinned
#### Response
```
{
    id: This is Pinata's ID for the pin job,
    ipfsHash: This is the IPFS multi-hash provided to Pinata to pin,
    status: The current status of the pin job. If the request was successful the status should be 'searching'.
    name: The name of the pin (if provided initially)
}
```
##### Example Code
```javascript
const options = {
    pinataMetadata: {
        name: MyCustomName,
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        hostNodes: [
            '/ip4/hostNode1ExternalIP/tcp/4001/ipfs/hostNode1PeerId',
            '/ip4/hostNode2ExternalIP/tcp/4001/ipfs/hostNode2PeerId'
        ]
    }
};
pinata.pinByHash('yourHashHere', options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="pinFileToIPFS-anchor"></a>
### `pinFileToIPFS`
Send a file to Pinata for direct pinning to IPFS.

##### `pinata.pinFileToIPFS(readableStream, options)`
##### Params
* `readableStream` - A [readableStream](https://nodejs.org/api/stream.html) of the file to be added 
* `options` (optional): A JSON object that can contain the following keyvalues:
  * `pinataMetadata` (optional): A JSON object with [optional metadata](#metadata-anchor) for the file being pinned
  * `pinataOptions` (optional): A JSON object with additional [options](#metadata-anchor) for the file being pinned
#### Response
```
{
    IpfsHash: This is the IPFS multi-hash provided back for your content,
    PinSize: This is how large (in bytes) the content you just pinned is,
    Timestamp: This is the timestamp for your content pinning (represented in ISO 8601 format)
}
```
##### Example Code
```javascript
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./yourfile.png');
const options = {
    pinataMetadata: {
        name: MyCustomName,
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="pinFromFS-anchor"></a>
### `pinFromFS`
Read from a location on your local file system and recursively pin the contents to IPFS (node.js only).

Both individual files, as well as directories can be read from.

##### `pinata.pinFromFS(sourcePath, options)`
##### Params
* `sourcePath` - The location on your local filesystem that should be read from. 
* `options` (optional): A JSON object that can contain the following keyvalues:
  * `pinataMetadata` (optional): A JSON object with [optional metadata](#metadata-anchor) for the file being pinned
  * `pinataOptions` (optional): A JSON object with additional [options](#metadata-anchor) for the file being pinned
#### Response
```
{
    IpfsHash: This is the IPFS multi-hash provided back for your content,
    PinSize: This is how large (in bytes) the content you just pinned is,
    Timestamp: This is the timestamp for your content pinning (represented in ISO 8601 format)
}
```
##### Example Code
```javascript
const sourcePath = '/Users/me/builds/my-awesome-website/';
const options = {
    pinataMetadata: {
        name: 'My Awesome Website',
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinFromFS(sourcePath, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="pinJobs-anchor"></a>
### `pinJobs`
This endpoint allows users to search for the status of all hashes that are currently in Pinata's pin queue. Records in the pin queue arrived there through either the [pinByHash](#addHashToPinQueue-anchor) operation or by failing during a [pinHashToIPFS](#pinHashToIPFS-anchor) operation.

##### `pinata.pinJobs(filters)`
##### Params
* `filters` (optional): An object that can consist of the following optional query parameters:
  * `sort` (optional): How you wish for the records in the response to be sorted. Valid inputs for this are:
    * `'ASC'`
    * `'DESC'`
  * `status` (optional): What the current status of the record is in the pin queue. Valid statuses and their meanings are:
    * `prechecking` - Pinata is running preliminary validations on your pin request.
    * `searching` - Pinata is actively searching for your content on the IPFS network. This may take some time if your content is isolated.
    * `retrieving` - Pinata has located your content and is now in the process of retrieving it.
    * `expired` - Pinata wasn't able to find your content after a day of searching the IPFS network. Please make sure your content is hosted on the IPFS network before trying to pin again.
    * `over_free_limit` - Pinning this object would put you over the free tier limit. Please add a credit card to continue pinning content.
    * `over_max_size` - This object is too large of an item to pin. If you're seeing this, please contact us for a more custom solution.
    * `invalid_object` - The object you're attempting to pin isn't readable by IPFS nodes. Please contact us if you receive this, as we'd like to better understand what you're attempting to pin.
    * `bad_host_node` - The provided host node(s) were either invalid or unreachable. Please make sure all provided host nodes are online and reachable.

  * `ipfs_pin_hash` (optional): A string for a valid IPFS hash (also known as a CID) to search for 
  * `limit` (optional): Limit the amount of results returned per page of results (default is 5, and max is also 1000)
  * `offset` (optional): Provide the record offset for records being returned. This is how you retrieve records on additional pages (default is 0)
#### Response
```
{
    count: (this is the total number of pin job records that exist for the query filters you passed in),
    rows: [
        {
            id: (the id for the pin job record),
            ipfs_pin_hash: (the IPFS multi-hash for the content you pinned),
            date_queued: (The date this hash was initially queued to be pinned - represented in ISO 8601 format),
            name: (If you passed in a name for your hash, it will be listed here),
            status: (The current status for the pin job)
        },
        {
            same record format as above
        }
        .
        .
        .
    ]
}
```
##### Example Code
```javascript
const filters = {
    sort: 'ASC',
    status: 'searching',
    ipfs_pin_hash: 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp',
    limit: 10,
    offset: 0
};
pinata.pinJobs('yourHashHere', filters).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="pinJSONToIPFS-anchor"></a>
### `pinJSONToIPFS`
Send JSON to Pinata for direct pinning to IPFS.

##### `pinata.pinJSONToIPFS(body, options)`
##### Params
* `body` - Valid JSON you wish to pin to IPFS
* `options` (optional): A JSON object that can contain the following keyvalues:
  * `metadata` (optional): A JSON object with [optional metadata](#metadata-anchor) for the hash being pinned
  * `pinataOptions` (optional): A JSON object with additional [options](#metadata-anchor) for the JSON being pinned
#### Response
```
{
    IpfsHash: This is the IPFS multi-hash provided back for your content,
    PinSize: This is how large (in bytes) the content you just pinned is,
    Timestamp: This is the timestamp for your content pinning (represented in ISO 8601 format)
}
```
##### Example Code
```javascript
const body = {
    message: 'Pinatas are awesome'
};
const options = {
    pinataMetadata: {
        name: MyCustomName,
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinJSONToIPFS(body, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="unpin-anchor"></a>
### `unpin`
Have Pinata unpin content that you've pinned through the service.

##### `pinata.unpin(hashToUnpin)`
##### Params
* `hashToUnpin` - the hash of the content you wish to unpin from Pinata
#### Response
If the operation is successful, you will simply receive "OK" as your result
##### Example Code
```javascript
pinata.unpin(hashToUnpin).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="testAuthentication-anchor"></a>
### `testAuthentication`
Tests that you can authenticate with Pinata correctly

##### `pinata.testAuthentication()`
##### Params
None

#### Response
```
{
    authenticated: true
}
```

##### Example Code
```javascript
pinata.testAuthentication().then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="pinList-anchor"></a>
### `pinList`
Retrieve pin records for your Pinata account. In order to get the next page you have to manipulate `pageLimit` and `pageOffset` filter to get the next page. This method no longer return the total count of pins. We highly encourage you to use the auto-pagination method [getFilesByCount](#getFilesByCount-anchor).

##### `pinata.pinList(filters)`
##### Params
* `filters` (optional): An object that can consist of the following optional query parameters:
  * `hashContains` (optional): A string of alphanumeric characters that desires hashes must contain
  * `pinStart` (optional): The earliest date the content is allowed to have been pinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `pinEnd` (optional): The earliest date the content is allowed to have been pinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `unpinStart` (optional): The earlist date the content is allowed to have been unpinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `unpinEnd` (optional): The latest date the content is allowed to have been unpinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `pinSizeMin` (optional): The minimum byte size that pin record you're looking for can have
  * `pinSizeMax` (optional): The maximum byte size that pin record you're looking for can have
  * `status` (optional): Filter pins using one of the following options
    * `'all'` (Records for both pinned and unpinned content will be returned)
    * `'pinned'` (Only records for pinned content will be returned)
    * `'unpinned'` (Only records for unpinned content will be returned)
  * `pageLimit` (optional): Limit the amount of results returned per page of results (default is 10, and max is 1000)
  * `pageOffset` (optional): Provide the record offset for records being returned. This is how you retrieve records on additional pages (default is 0)
   * `metadata` (optional): A JSON object that can be used to find records for content that had optional metadata included when it was added to Pinata. The metadata object is formatted as follows:
 
##### Metadata filter object formatting
```
{
    name: 'exampleName',
    keyvalues: {
        testKeyValue: {
            value: 'exampleFilterValue',
            op: 'exampleFilterOperation'
        },
        testKeyValue2: {
            value: 'exampleFilterValue2',
            op: 'exampleFilterOperation2'
        }
    }
}
```
Filter explanations:
* `name` (optional): If provided, any records returned must have a name that contains the string provided for the 'name'.
* `keyvalues` (optional): Each keyvalue provided in this object have both a `value` and `op`
  * `value` (required): This is the value which will be filtered on
  * `op` (required): This is the filter operation that will be applied to the `value` that was provided. Valid op values are:
     * `'gt'` (greater than the value provided)
     * `'gte'` (greater than or equal to the value provided)
     * `'lt'` (less than the value provided)
     * `'lte'` (less than or equal to the value provided)
     * `'ne'` (not equal to the value provided)
     * `'eq'` (equal to the value provided)
     * `'between'` (between the two values provided) - NOTE - This also requires a `secondValue` be provided as seen in the example below
     * `'notBetween'` (not between the two values provided) - NOTE - This also requires a `secondValue` be provided as seen in the example below
     * `'like'` (like the value provided)
     * `'notLike'` (not like the value provided)
     * `'iLike'` (case insensitive version of `like`)
     * `'notILike'` (case insensitive version of `notLike`)
     * `'regexp'` (filter the value provided based on a provided regular expression)
     * `'iRegexp'` (case insensitive version of regexp)
  
As an example, the following filter would only find records whose name contains the letters 'invoice', have the metadata key 'company' with a value of 'exampleCompany', and have a metadata key 'total' with values between 500 and 1000:
```
{
    name: 'invoice',
    keyvalues: {
        company: {
            value: 'exampleCompany,
            op: 'eq'
        },
        total: {
            value: 500,
            secondValue: 1000,
            op: 'between'
        }
    }
}
```

Our libraries support auto-pagination. This feature easily handles fetching large lists of resources without having to manually paginate results and perform subsequent requests.

To use the auto-pagination feature in Node 10+, simply iterate over a "list" call with the parameters you need in a for await loop.

<a name="getFilesByCount-anchor"></a>
### `getFilesByCount`
This method support auto-pagination. This feature easily handles fetching large lists of pin records for your Pinata account without having to manually paginate results and perform subsequent requests. To use the auto-pagination feature in Node 10+.

##### `pinata.getFilesByCount(filters, count)`
##### Params
* `filters` (optional): An object that can consist of the following optional query parameters:
  * `hashContains` (optional): A string of alphanumeric characters that desires hashes must contain
  * `pinStart` (optional): The earliest date the content is allowed to have been pinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `pinEnd` (optional): The earliest date the content is allowed to have been pinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `unpinStart` (optional): The earlist date the content is allowed to have been unpinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `unpinEnd` (optional): The latest date the content is allowed to have been unpinned. Must be a valid [ISO_8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) date. 
  * `pinSizeMin` (optional): The minimum byte size that pin record you're looking for can have
  * `pinSizeMax` (optional): The maximum byte size that pin record you're looking for can have
  * `status` (optional): Filter pins using one of the following options
    * `'all'` (Records for both pinned and unpinned content will be returned)
    * `'pinned'` (Only records for pinned content will be returned)
    * `'unpinned'` (Only records for unpinned content will be returned)  
  * `metadata` (optional): A JSON object that can be used to find records for content that had optional metadata included when it was added to Pinata. The metadata object is formatted as follows:
* `count` (optional): A Number that specifies how many pins you want. if no number is provided then it will pull all the pins based on your filter

##### Metadata filter object formatting
```
{
    name: 'exampleName',
    keyvalues: {
        testKeyValue: {
            value: 'exampleFilterValue',
            op: 'exampleFilterOperation'
        },
        testKeyValue2: {
            value: 'exampleFilterValue2',
            op: 'exampleFilterOperation2'
        }
    }
}
```
Filter explanations:
* `name` (optional): If provided, any records returned must have a name that contains the string provided for the 'name'.
* `keyvalues` (optional): Each keyvalue provided in this object have both a `value` and `op`
  * `value` (required): This is the value which will be filtered on
  * `op` (required): This is the filter operation that will be applied to the `value` that was provided. Valid op values are:
     * `'gt'` (greater than the value provided)
     * `'gte'` (greater than or equal to the value provided)
     * `'lt'` (less than the value provided)
     * `'lte'` (less than or equal to the value provided)
     * `'ne'` (not equal to the value provided)
     * `'eq'` (equal to the value provided)
     * `'between'` (between the two values provided) - NOTE - This also requires a `secondValue` be provided as seen in the example below
     * `'notBetween'` (not between the two values provided) - NOTE - This also requires a `secondValue` be provided as seen in the example below
     * `'like'` (like the value provided)
     * `'notLike'` (not like the value provided)
     * `'iLike'` (case insensitive version of `like`)
     * `'notILike'` (case insensitive version of `notLike`)
     * `'regexp'` (filter the value provided based on a provided regular expression)
     * `'iRegexp'` (case insensitive version of regexp)
  
```

#### Response
```
[
    {
            id: (the id of your pin instance record),
            ipfs_pin_hash: (the IPFS multi-hash for the content you pinned),
            size: (this is how large (in bytes) the content pinned is),
            user_id: (this is your user id for Pinata),
            date_pinned: (This is the timestamp for when this content was pinned - represented in ISO 8601 format),
            date_unpinned: (This is the timestamp for when this content was unpinned (if null, then you still have the content pinned on Pinata),
            metadata: {
                name: (this will be the name of the file originally uploaded, or the custom name you set),
                keyvalues: {
                    exampleCustomKey: "exampleCustomValue",
                    exampleCustomKey2: "exampleCustomValue2",
                    ...
                }
            }
        },
        {
            same record format as above
        }
        .
        .
        .
]

```
##### Example Code

```javascript
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('yourPinataApiKey', 'yourPinataSecretApiKey');

const metadataFilter = {
    name: 'exampleName',
    keyvalues: {
        testKeyValue: {
            value: 'exampleFilterValue',
            op: 'exampleFilterOperation'
        },
        testKeyValue2: {
            value: 'exampleFilterValue2',
            op: 'exampleFilterOperation2'
        }
    }
};

const filters = {
    status : 'pinned',
    pageLimit: 10,
    pageOffset: 0,
    metadata: metadataFilter
};

 // more reference at [for await ...](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
 for await (const item of pinata.getFilesByCount(filters, 35)) {
    // ...(item) perform any task with the current item in the array of 35
 }


for await (const item of pinata.getFilesByCount(filters)) {
    // ...(item) perform any task with the current item the array is determined by all your pins
 }

```

<a name="userPinnedDataTotal-anchor"></a>
### `userPinnedDataTotal`
Returns the total combined size (in bytes) of all content you currently have pinned on Pinata.

##### `pinata.userPinnedDataTotal()`
##### Params
None

#### Response
The response for this call will the total combined size of everything you currently have pinned on pinata.
This value will be expressed in bytes

##### Example Code
```javascript
pinata.userPinnedDataTotal().then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
```

<a name="hostNode-anchor"></a>
## Host Node Multiaddresses
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


<a name="pinPolicies-anchor"></a>

## Pin Policies
A pin policy tells Pinata how many times content should be replicated, and where that content should be replicated at.

To read more about pin policies, please check out the [Regions and Replications Documentation](https://pinata.cloud/documentation#RegionsAndReplications).

Pin policies take the following form:

  
##### Example pin policy object
```
{
    regions: [
        {
            id: 'FRA1',
            desiredReplicationCount: 1
        },
        {
            id: 'NYC1',
            desiredReplicationCount: 2
        }
    ]
}
```
The ids of currently available public regions are:

• FRA1 - Frankfurt, Germany (max 2 replications)

• NYC1 - New York City, USA (max 2 replications)

<a name="metadata-anchor"></a>
## Pinata Metadata
For endpoints that allow you to add content, Pinata lets you add optionally metadata for that content. This metadata can later be used for querying on what you've pinned with our [userPinList](#userPinList-anchor) endpoint. Providing metadata does not alter your content or how it is stored on IPFS in any way.

The metadata object can consist of the following values:
* name (optional) - A custom string to use as the name for your content
* keyvalues (optional) - An object containing up to 10 custom key / value pairs. The values can be:
  * strings
  * numbers (integers or decimals)
  * dates (provided in ISO_8601 format)
  
##### Example metadata object
```
{
    name: "customName",
    keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2"
    }
}
```
<a name="pinataOptions-anchor"></a>

## Pinata Options
Some endpoints allow you to pass additional options for Pinata to take into account when adding content to IPFS.

The options object can consist of the following values:
* cidVerson (optional) - The [CID version](https://github.com/multiformats/cid#versions) IPFS will use when creating a hash for your content. Valid options are:
  * `0` - CIDv0
  * `1` - CIDv1
* wrapWithDirectory (optional) - Tells IPFS to wrap your content in a directory to preserve the content's original name. See [this blog post](https://flyingzumwalt.gitbooks.io/decentralized-web-primer/content/files-on-ipfs/lessons/wrap-directories-around-content.html) for more details on what this does. Valid options are:
  * `true`
  * `false`

  
##### Example pinataOptions object
```
{
    cidVersion: 1,
    wrapWithDirectory: true
}
```

## Questions? Issues? Suggestions? 
Feel free to file a github issue or email us at team@pinata.cloud 

We'd love to hear from you!
