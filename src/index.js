import pinByHash from './commands/pinning/pinByHash';
import hashMetadata from './commands/pinning/hashMetadata';
import hashPinPolicy from './commands/pinning/hashPinPolicy';
import pinFileToIPFS from './commands/pinning/pinFileToIPFS';
import pinFromFS from './commands/pinning/pinFromFS';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinJobs from './commands/pinning/pinJobs/pinJobs';
import unpin from './commands/pinning/unpin';
import userPinPolicy from './commands/pinning/userPinPolicy';
import testAuthentication from './commands/data/testAuthentication';
import pinList from './commands/data/pinList/pinList';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    let client = {};

    //  setting up the actual calls you can make using this package
    client.pinByHash = function (hashToPin, options) {
        return pinByHash(pinataApiKey, pinataSecretApiKey, hashToPin, options);
    };
    client.hashMetadata = function (ipfsPinHash, metadata) {
        return hashMetadata(pinataApiKey, pinataSecretApiKey, ipfsPinHash, metadata);
    };
    client.hashPinPolicy = function (ipfsPinHash, newPinPolicy) {
        return hashPinPolicy(pinataApiKey, pinataSecretApiKey, ipfsPinHash, newPinPolicy);
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
    client.pinJobs = function (filters) {
        return pinJobs(pinataApiKey, pinataSecretApiKey, filters);
    };
    client.unpin = function (hashToUnpin) {
        return unpin(pinataApiKey, pinataSecretApiKey, hashToUnpin);
    };
    client.userPinPolicy = function (newPinPolicy) {
        return userPinPolicy(pinataApiKey, pinataSecretApiKey, newPinPolicy);
    };
    client.testAuthentication = function () {
        return testAuthentication(pinataApiKey, pinataSecretApiKey);
    };
    client.pinList = function (filters) {
        return pinList(pinataApiKey, pinataSecretApiKey, filters);
    };
    client.userPinnedDataTotal = function () {
        return userPinnedDataTotal(pinataApiKey, pinataSecretApiKey);
    };
    return client;
}
