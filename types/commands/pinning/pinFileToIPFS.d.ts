import { PinataConfig } from '../..';
export interface PinataPinPolicyItem {
    id: string;
    desiredReplicationCount: number;
}
export interface PinataOptions {
    hostNodes?: string[] | undefined;
    cidVersion?: 0 | 1;
    wrapWithDirectory?: boolean;
    customPinPolicy?: {
        regions: PinataPinPolicyItem[];
    };
}
export interface PinataPinResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
}
export interface PinataPinOptions {
    pinataMetadata?: {
        [key: string]: string | number | null;
    };
    pinataOptions?: PinataOptions | undefined;
}
/**
 * Pin File to IPFS
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} readStream
 * @param {*} options
 * @returns {Promise<unknown>}
 */
export default function pinFileToIPFS(config: PinataConfig, readStream: any, options?: PinataPinOptions): Promise<PinataPinResponse>;
