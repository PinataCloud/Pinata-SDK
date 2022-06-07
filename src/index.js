import pinByHash from './commands/pinning/pinByHash';
import hashMetadata from './commands/pinning/hashMetadata';
import pinFileToIPFS from './commands/pinning/pinFileToIPFS';
import pinFromFS from './commands/pinning/pinFromFS';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinJobs from './commands/pinning/pinJobs/pinJobs';
import unpin from './commands/pinning/unpin';
import testAuthentication from './commands/data/testAuthentication';
import pinList from './commands/data/pinList/pinList';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

// OPTIONS

/**
 * @typedef {Record<string, string | number | null>} PinataMetadata
 */

/**
 * @typedef PinataMetadataFilter
 * @property {string} [name]
 * @property {Record<string, {value: string, op: string}>} keyvalues
 */

/**
 * @typedef {{id: string, desiredReplicationCount: number}} PinataPinPolicyItem
 */

/**
 * @typedef PinataPinByHashOptions
 * @property {string[]} [hostNodes]
 * @property {{regions: PinataPinPolicyItem[]}} [customPinPolicy]
 */

/**
 * @typedef PinataPinByHashPinOptions
 * @property {PinataMetadata} [pinataMetadata]
 * @property {PinataPinByHashOptions} [pinataOptions]
 */

/**
 * @typedef PinataOptions
 * @property {0 | 1} [cidVersion]
 * @property {boolean} [wrapWithDirectory]
 * @property {{regions: PinataPinPolicyItem[]}} [customPinPolicy]
 */

/**
 * @typedef PinataPinOptions
 * @property {PinataMetadata} [pinataMetadata]
 * @property {PinataOptions} [pinataOptions]
 */

/**
 * @typedef PinataPinJobsFilterOptions
 * @property {'ASC' | 'DESC'} sort
 * @property {string} [status]
 * @property {string} [ipfs_pin_hash]
 * @property {number} [limit]
 * @property {number} [offset]
 */

/**
 * @typedef PinataPinListFilterOptions
 * @property {string} [hashContains]
 * @property {string} [pinStart]
 * @property {string} [pinEnd]
 * @property {string} [unpinStart]
 * @property {string} [unpinEnd]
 * @property {number} [pinSizeMin]
 * @property {number} [pinSizeMax]
 * @property {string} [status]
 * @property {number} [pageLimit]
 * @property {number} [pageOffset]
 * @property {PinataMetadataFilter} [metadata]
 */

// RESPONSES

/**
 * @typedef PinataPinByHashResponse
 * @property {number | string} id
 * @property {string} ipfsHash
 * @property {string} status
 * @property {string} name
 */

/**
 * @typedef PinataPinResponse
 * @property {string} IpfsHash
 * @property {number} PinSize
 * @property {string} Timestamp
 */

/**
 * @typedef PinataPinJobsResponseRow
 * @property {number | string} id
 * @property {string} ipfs_pin_hash
 * @property {string} date_queued
 * @property {string | undefined | null} name
 * @property {string} status
 */

/**
 * @typedef PinataPinJobsResponse
 * @property {number} count
 * @property {PinataPinJobsResponseRow[]} rows
 */

/**
 * @typedef PinataPinListResponseRow
 * @property {number | string} id
 * @property {string} ipfs_pin_hash
 * @property {number} size
 * @property {string | number} user_id
 * @property {string} date_pinned
 * @property {string} date_unpinned
 * @property {PinataMetadata} metadata
 */

/**
 * @typedef PinataPinListResponse
 * @property {number} count
 * @property {PinataPinListResponseRow[]} rows
 */

// METHODS

/**
 * Hash meta data
 * @callback hashMetadata
 * @param {string} ipfsPinHash
 * @param {PinataMetadata} metadata
 * @returns {Promise<any>}
 */

/**
 * Pin by hash
 * @callback pinByHash
 * @param {string} hashToPin
 * @param {PinataPinByHashPinOptions} [options]
 * @returns {Promise<PinataPinByHashResponse>}
 */

/**
 * Pin file to IPFS
 * @callback pinFileToIPFS
 * @param {ReadStream} readableStream
 * @param {PinataPinOptions} [options]
 * @returns {Promise<PinataPinResponse>}
 */

/**
 * Pin from FS
 * @callback pinFromFS
 * @param {string} sourcePath
 * @param {PinataPinOptions} [options]
 * @returns {Promise<PinataPinResponse>}
 */

/**
 * Pin Jobs
 * @callback pinJobs
 * @param {PinataPinJobsFilterOptions} [filters]
 * @returns {Promise<PinataPinJobsResponse>}
 */

/**
 * Pin JSON to IPFS
 * @callback pinJSONToIPFS
 * @param {Object} body
 * @param {PinataPinOptions} [options]
 * @returns {Promise<PinataPinResponse>}
 */

/**
 * Unpin
 * @callback unpin
 * @param {string} hashToUnpin
 * @returns {Promise<any>}
 */

/**
 * Test Authentication
 * @callback testAuthentication
 * @returns {Promise<{authenticated: boolean}>}
 */

/**
 * Pin List
 * @callback pinList
 * @param {PinataPinListFilterOptions} [filters]
 * @returns {Promise<PinataPinListResponse>}
 */

/**
 * User Pinned Data Total
 * @callback userPinnedDataTotal
 * @returns {Promise<number>}
 */

/**
 * @typedef PinataClient
 * @property {pinByHash} pinByHash
 * @property {hashMetadata} hashMetadata
 * @property {pinFileToIPFS} pinFileToIPFS
 * @property {pinFromFS} pinFromFS
 * @property {pinJSONToIPFS} pinJSONToIPFS
 * @property {pinJobs} pinJobs
 * @property {unpin} unpin
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
