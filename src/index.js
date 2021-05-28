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
 * Pin by hash
 * @callback pinByHash
 * @param {*} hashToPin
 * @param {*} options
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Hash meta data
 * @callback hashMetadata
 * @param {*} ipfsPinHash
 * @param {*} metadata
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Hash pin policy
 * @callback hashPinPolicy
 * @param {*} ipfsPinHash
 * @param {*} newPinPolicy
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Pin file to IPFS
 * @callback pinFileToIPFS
 * @param {*} readableStream
 * @param {*} options
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Pin from FS
 * @callback pinFromFS
 * @param {*} sourcePath
 * @param {*} options
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Pin JSON to IPFS
 * @callback pinJSONToIPFS
 * @param {*} body
 * @param {*} options
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Pin Jobs
 * @callback pinJobs
 * @param {*} filters
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Unpin
 * @callback unpin
 * @param {*} hashToUnpin
 * @returns {Promise | Promise<unknown>}
 */

/**
 * User Pin Policy
 * @callback userPinPolicy
 * @param {*} newPinPolicy
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Test Authentication
 * @callback testAuthentication
 * @returns {Promise | Promise<unknown>}
 */

/**
 * Pin List
 * @callback pinList
 * @param {*} filters
 * @returns {Promise | Promise<unknown>}
 */

/**
 * User Pinned Data Total
 * @callback userPinnedDataTotal
 * @returns {Promise | Promise<unknown>}
 */

/**
 * @typedef PinataClient
 * @property {pinByHash} pinByHash
 * @property {hashMetadata} hashMetadata
 * @property {hashPinPolicy} hashPinPolicy
 * @property {pinFileToIPFS} pinFileToIPFS
 * @property {pinFromFS} pinFromFS
 * @property {pinJSONToIPFS} pinJSONToIPFS
 * @property {pinJobs} pinJobs
 * @property {unpin} unpin
 * @property {userPinPolicy} userPinPolicy
 * @property {testAuthentication} testAuthentication
 * @property {pinList} pinList
 * @property {userPinnedDataTotal} userPinnedDataTotal
 */

/**
 * Pinata Client
 *
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @returns {PinataClient}
 */
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
