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
 * @class PinataClient
 */
export class PinataClient {
    /**
     * Constructor
     * @param {string} pinataApiKey
     * @param {string} pinataSecretApiKey
     */
    constructor(pinataApiKey, pinataSecretApiKey) {
        this.pinataApiKey = pinataApiKey;
        this.pinataSecretApiKey = pinataSecretApiKey;
    }

    //  setting up the actual calls you can make using this package
    /**
     * Pin by hash
     * @param {*} hashToPin
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    pinByHash(hashToPin, options) {
        return pinByHash(this.pinataApiKey, this.pinataSecretApiKey, hashToPin, options);
    };
    /**
     * Hash meta data
     * @param {*} ipfsPinHash
     * @param {*} metadata
     * @returns {Promise | Promise<unknown>}
     */
    hashMetadata(ipfsPinHash, metadata) {
        return hashMetadata(this.pinataApiKey, this.pinataSecretApiKey, ipfsPinHash, metadata);
    };
    /**
     * Hash pin policy
     * @param {*} ipfsPinHash
     * @param {*} newPinPolicy
     * @returns {Promise | Promise<unknown>}
     */
    hashPinPolicy(ipfsPinHash, newPinPolicy) {
        return hashPinPolicy(this.pinataApiKey, this.pinataSecretApiKey, ipfsPinHash, newPinPolicy);
    };
    /**
     * Pin file to IPFS
     * @param {*} readableStream
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    pinFileToIPFS(readableStream, options) {
        return pinFileToIPFS(this.pinataApiKey, this.pinataSecretApiKey, readableStream, options);
    };
    /**
     * Pin from FS
     * @param {*} sourcePath
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    pinFromFS(sourcePath, options) {
        return pinFromFS(this.pinataApiKey, this.pinataSecretApiKey, sourcePath, options);
    };
    /**
     * Pin JSON to IPFS
     * @param {*} body
     * @param {*} options
     * @returns {Promise | Promise<unknown>}
     */
    pinJSONToIPFS(body, options) {
        return pinJSONToIPFS(this.pinataApiKey, this.pinataSecretApiKey, body, options);
    };
    /**
     * Pin Jobs
     * @param {*} filters
     * @returns {Promise | Promise<unknown>}
     */
    pinJobs(filters) {
        return pinJobs(this.pinataApiKey, this.pinataSecretApiKey, filters);
    };
    /**
     * Unpin
     * @param {*} hashToUnpin
     * @returns {Promise | Promise<unknown>}
     */
    unpin(hashToUnpin) {
        return unpin(this.pinataApiKey, this.pinataSecretApiKey, hashToUnpin);
    };
    /**
     * User Pin Policy
     * @param {*} newPinPolicy
     * @returns {Promise | Promise<unknown>}
     */
    userPinPolicy(newPinPolicy) {
        return userPinPolicy(this.pinataApiKey, this.pinataSecretApiKey, newPinPolicy);
    };
    /**
     * Test Authentication
     * @returns {Promise | Promise<unknown>}
     */
    testAuthentication() {
        return testAuthentication(this.pinataApiKey, this.pinataSecretApiKey);
    };
    /**
     * Pin List
     * @param {*} filters
     * @returns {Promise | Promise<unknown>}
     */
    pinList(filters) {
        return pinList(this.pinataApiKey, this.pinataSecretApiKey, filters);
    };
    /**
     * User Pinned Data Total
     * @returns {Promise | Promise<unknown>}
     */
    userPinnedDataTotal() {
        return userPinnedDataTotal(this.pinataApiKey, this.pinataSecretApiKey);
    };
}

export default function pinataClient(pinataApiKey, pinataSecretApiKey) {
    return new PinataClient(pinataApiKey, pinataSecretApiKey);
}
