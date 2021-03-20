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

/**
 * Pinata Client
 *
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @returns {{}}
 */
export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    let client = {};

    //  setting up the actual calls you can make using this package
    /**
     * Pin by hash
     * @param {*} hashToPin
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    client.pinByHash = function (hashToPin, options) {
        return pinByHash(pinataApiKey, pinataSecretApiKey, hashToPin, options);
    };
    /**
     * Hash meta data
     * @param {*} ipfsPinHash
     * @param {*} metadata
     * @returns {Promise | Promise<unknown>}
     */
    client.hashMetadata = function (ipfsPinHash, metadata) {
        return hashMetadata(pinataApiKey, pinataSecretApiKey, ipfsPinHash, metadata);
    };
    /**
     * Hash pin policy
     * @param {*} ipfsPinHash
     * @param {*} newPinPolicy
     * @returns {Promise | Promise<unknown>}
     */
    client.hashPinPolicy = function (ipfsPinHash, newPinPolicy) {
        return hashPinPolicy(pinataApiKey, pinataSecretApiKey, ipfsPinHash, newPinPolicy);
    };
    /**
     * Pin file to IPFS
     * @param {*} readableStream
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    client.pinFileToIPFS = function (readableStream, options) {
        return pinFileToIPFS(pinataApiKey, pinataSecretApiKey, readableStream, options);
    };
    /**
     * Pin from FS
     * @param {*} sourcePath
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    client.pinFromFS = function (sourcePath, options) {
        return pinFromFS(pinataApiKey, pinataSecretApiKey, sourcePath, options);
    };
    /**
     * Pin JSON to IPFS
     * @param {*} body
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    client.pinJSONToIPFS = function (body, options) {
        return pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, body, options);
    };
    /**
     * Pin Jobs
     * @param {*} filters
     * @returns {Promise | Promise<unknown>}
     */
    client.pinJobs = function (filters) {
        return pinJobs(pinataApiKey, pinataSecretApiKey, filters);
    };
    /**
     * Unpin
     * @param {*} hashToUnpin
     * @returns {Promise | Promise<unknown>}
     */
    client.unpin = function (hashToUnpin) {
        return unpin(pinataApiKey, pinataSecretApiKey, hashToUnpin);
    };
    /**
     * User Pin Policy
     * @param {*} newPinPolicy
     * @returns {Promise | Promise<unknown>}
     */
    client.userPinPolicy = function (newPinPolicy) {
        return userPinPolicy(pinataApiKey, pinataSecretApiKey, newPinPolicy);
    };
    /**
     * Test Authentication
     * @returns {Promise | Promise<unknown>}
     */
    client.testAuthentication = function () {
        return testAuthentication(pinataApiKey, pinataSecretApiKey);
    };
    /**
     * Pin List
     * @param {*} filters
     * @returns {Promise | Promise<unknown>}
     */
    client.pinList = function (filters) {
        return pinList(pinataApiKey, pinataSecretApiKey, filters);
    };
    /**
     * User Pinned Data Total
     * @returns {Promise | Promise<unknown>}
     */
    client.userPinnedDataTotal = function () {
        return userPinnedDataTotal(pinataApiKey, pinataSecretApiKey);
    };
    return client;
}
