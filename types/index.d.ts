/**
 * Pinata Client
 *
 * @param {string | PinataConfig} [pinataApiKey]
 * @param {string} [pinataSecretApiKey]
 * @returns {PinataClient}
 */
export default function pinataClient(pinataApiKey?: string | PinataConfig | undefined, pinataSecretApiKey?: string | undefined): PinataClient;
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
export type PinataConfig = {
    pinataApiKey?: string | undefined;
    pinataSecretApiKey?: string | undefined;
    pinataJWTKey?: string | undefined;
};
export type PinataClient = {
    config: PinataConfig;
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
