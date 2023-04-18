import './require-babel-polyfill';
import { PinataPinByHashPinOptions } from './commands/pinning/pinByHash';
import { PinataPinOptions } from './commands/pinning/pinFileToIPFS';
import { PinataPinJobsFilterOptions } from './commands/pinning/pinJobs/pinJobs';
import { PinataMetadata, PinataPinListFilterOptions } from './commands/data/pinList/pinList';
export interface PinataConfig {
    pinataApiKey?: string;
    pinataSecretApiKey?: string;
    pinataJWTKey?: string;
}
declare class PinataClient {
    config: PinataConfig;
    constructor(pinataApiKey?: string | PinataConfig, pinataSecretApiKey?: string);
    pinByHash(hashToPin: string, options?: PinataPinByHashPinOptions): Promise<any>;
    hashMetadata(ipfsPinHash: string, metadata: PinataMetadata): Promise<any>;
    pinFileToIPFS(readableStream: any, options?: PinataPinOptions): Promise<import("./commands/pinning").PinataPinResponse>;
    pinFromFS(sourcePath: string, options?: PinataPinOptions): Promise<import("./commands/pinning").PinataPinResponse>;
    pinJSONToIPFS(body: any, options?: PinataPinOptions): Promise<import("./commands/pinning").PinataPinResponse>;
    pinJobs(filters?: PinataPinJobsFilterOptions): Promise<import("./commands/pinning").PinataPinJobsResponse>;
    unpin(hashToUnpin: string): Promise<unknown>;
    pinList(filters: PinataPinListFilterOptions): Promise<import("./commands/data").PinataPinListResponse>;
    getFilesByCount(filters: PinataPinListFilterOptions, maxCount?: number): {
        [Symbol.asyncIterator]: () => {
            next(): Promise<{
                value: import("./commands/data").PinataPin;
                done: boolean;
            }>;
            return(): Promise<{
                value: number;
                done: boolean;
            }>;
        };
    };
    testAuthentication(): Promise<import("./commands/data").PinataTestAuthenticationResponse>;
    userPinnedDataTotal(): Promise<number>;
}
export * from './commands/data';
export * from './commands/pinning';
export default PinataClient;
