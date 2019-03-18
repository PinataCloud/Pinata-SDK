import addHashToPinQueue from './commands/pinning/addHashToPinQueue';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinHashToIPFS from './commands/pinning/pinHashToIPFS';
import pinJobs from './commands/pinning/pinJobs/pinJobs';
import removePinFromIPFS from './commands/pinning/removePinFromIPFS';
import testAuthentication from './commands/data/testAuthentication';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    let client = {};

    //  setting up the actual calls you can make using this package
    client.addHashToPinQueue = function (hashToPin, options) {
        return addHashToPinQueue(pinataApiKey, pinataSecretApiKey, hashToPin, options);
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
    client.userPinnedDataTotal = function () {
        return userPinnedDataTotal(pinataApiKey, pinataSecretApiKey);
    };
    return client;
}
