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
export default function pinataClient(pinataApiKey: string, pinataSecretApiKey: string): PinataClient;
export type PinataMetadata = Record<string, string | number | null>;
export type PinataMetadataFilter = {
    name?: string | undefined;
    keyvalues: Record<string, {
        value: string;
        op: string;
    }>;
};
export type PinataPinPolicyItem = {
    id: string;
    desiredReplicationCount: number;
};
export type PinataPinByHashOptions = {
    hostNodes?: string[] | undefined;
    customPinPolicy?: {
        regions: PinataPinPolicyItem[];
    } | undefined;
};
export type PinataPinByHashPinOptions = {
    pinataMetadata?: Record<string, string | number | null> | undefined;
    pinataOptions?: PinataPinByHashOptions | undefined;
};
export type PinataOptions = {
    cidVersion?: 0 | 1 | undefined;
    wrapWithDirectory?: boolean | undefined;
    customPinPolicy?: {
        regions: PinataPinPolicyItem[];
    } | undefined;
};
export type PinataPinOptions = {
    pinataMetadata?: Record<string, string | number | null> | undefined;
    pinataOptions?: PinataOptions | undefined;
};
export type PinataPinJobsFilterOptions = {
    sort: 'ASC' | 'DESC';
    status?: string | undefined;
    ipfs_pin_hash?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
};
export type PinataPinListFilterOptions = {
    hashContains?: string | undefined;
    pinStart?: string | undefined;
    pinEnd?: string | undefined;
    unpinStart?: string | undefined;
    unpinEnd?: string | undefined;
    pinSizeMin?: number | undefined;
    pinSizeMax?: number | undefined;
    status?: string | undefined;
    pageLimit?: number | undefined;
    pageOffset?: number | undefined;
    metadata?: PinataMetadataFilter | undefined;
};
export type PinataPinByHashResponse = {
    id: number | string;
    ipfsHash: string;
    status: string;
    name: string;
};
export type PinataPinResponse = {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
};
export type PinataPinJobsResponseRow = {
    id: number | string;
    ipfs_pin_hash: string;
    date_queued: string;
    name: string | undefined | null;
    status: string;
};
export type PinataPinJobsResponse = {
    count: number;
    rows: PinataPinJobsResponseRow[];
};
export type PinataPinListResponseRow = {
    id: number | string;
    ipfs_pin_hash: string;
    size: number;
    user_id: string | number;
    date_pinned: string;
    date_unpinned: string;
    metadata: PinataMetadata;
};
export type PinataPinListResponse = {
    count: number;
    rows: PinataPinListResponseRow[];
};
/**
 * Hash meta data
 */
export type hashMetadata = (ipfsPinHash: string, metadata: PinataMetadata) => Promise<any>;
/**
 * Pin by hash
 */
export type pinByHash = (hashToPin: string, options?: PinataPinByHashPinOptions | undefined) => Promise<PinataPinByHashResponse>;
/**
 * Pin file to IPFS
 */
export type pinFileToIPFS = (readableStream: any, options?: PinataPinOptions | undefined) => Promise<PinataPinResponse>;
/**
 * Pin from FS
 */
export type pinFromFS = (sourcePath: string, options?: PinataPinOptions | undefined) => Promise<PinataPinResponse>;
/**
 * Pin Jobs
 */
export type pinJobs = (filters?: PinataPinJobsFilterOptions | undefined) => Promise<PinataPinJobsResponse>;
/**
 * Pin JSON to IPFS
 */
export type pinJSONToIPFS = (body: Object, options?: PinataPinOptions | undefined) => Promise<PinataPinResponse>;
/**
 * Unpin
 */
export type unpin = (hashToUnpin: string) => Promise<any>;
/**
 * Test Authentication
 */
export type testAuthentication = () => Promise<{
    authenticated: boolean;
}>;
/**
 * Pin List
 */
export type pinList = (filters?: PinataPinListFilterOptions | undefined) => Promise<PinataPinListResponse>;
/**
 * User Pinned Data Total
 */
export type userPinnedDataTotal = () => Promise<number>;
export type PinataClient = {
    pinByHash: pinByHash;
    hashMetadata: hashMetadata;
    pinFileToIPFS: pinFileToIPFS;
    pinFromFS: pinFromFS;
    pinJSONToIPFS: pinJSONToIPFS;
    pinJobs: pinJobs;
    unpin: unpin;
    testAuthentication: testAuthentication;
    pinList: pinList;
    userPinnedDataTotal: userPinnedDataTotal;
};
import pinByHash from "./commands/pinning/pinByHash";
import hashMetadata from "./commands/pinning/hashMetadata";
import pinFileToIPFS from "./commands/pinning/pinFileToIPFS";
import pinFromFS from "./commands/pinning/pinFromFS";
import pinJSONToIPFS from "./commands/pinning/pinJSONToIPFS";
import pinJobs from "./commands/pinning/pinJobs/pinJobs";
import unpin from "./commands/pinning/unpin";
import testAuthentication from "./commands/data/testAuthentication";
import pinList from "./commands/data/pinList/pinList";
import userPinnedDataTotal from "./commands/data/userPinnedDataTotal";
