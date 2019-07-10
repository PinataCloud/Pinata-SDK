import addHashToPinQueue from './commands/pinning/addHashToPinQueue';
import pinFileToIPFS from './commands/pinning/pinFileToIPFS';
import pinFromFS from './commands/pinning/pinFromFS';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinHashToIPFS from './commands/pinning/pinHashToIPFS';
import pinJobs from './commands/pinning/pinJobs/pinJobs';
import removePinFromIPFS from './commands/pinning/removePinFromIPFS';
import testAuthentication from './commands/data/testAuthentication';
import pinList from './commands/data/pinList/pinList';
import userPinList from './commands/data/userPinList/userPinList';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    let client = {};

    //  setting up the actual calls you can make using this package
    client.addHashToPinQueue = function (hashToPin, options) {
        return addHashToPinQueue(pinataApiKey, pinataSecretApiKey, hashToPin, options);
    };
    client.pinFileToIPFS = function (readableStream, options) {
        return pinFileToIPFS(pinataApiKey, pinataSecretApiKey, readableStream, options);
    };
    client.pinFromFS = function (sourcePath, options) {
        return pinFromFS(pinataApiKey, pinataSecretApiKey, sourcePath, options);
    };
    client.pinJSONToIPFS = function (body, options) {
        return pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, body, options);
    };
    client.pinHashToIPFS = function (hashToPin, options) {
        return pinHashToIPFS(pinataApiKey, pinataSecretApiKey, hashToPin, options);
    };
    client.pinJobs = function (filters) {
        return pinJobs(pinataApiKey, pinataSecretApiKey, filters);
    };
    client.removePinFromIPFS = function (ipfsPinHash) {
        return removePinFromIPFS(pinataApiKey, pinataSecretApiKey, ipfsPinHash);
    };
    client.testAuthentication = function () {
        return testAuthentication(pinataApiKey, pinataSecretApiKey);
    };
    client.pinList = function (filters) {
        return pinList(pinataApiKey, pinataSecretApiKey, filters);
    };
    client.userPinList = function (filters) {
        return userPinList(pinataApiKey, pinataSecretApiKey, filters);
    };
    client.userPinnedDataTotal = function () {
        return userPinnedDataTotal(pinataApiKey, pinataSecretApiKey);
    };
    return client;
}
