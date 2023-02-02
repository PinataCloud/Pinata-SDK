import { PinataConfig } from '../..';
import { PinataOptions } from './pinFileToIPFS';
import { PinataMetadata } from '../data/pinList/pinList';
export interface PinataPinByHashPinOptions {
    pinataMetadata?: PinataMetadata;
    pinataOptions?: PinataOptions;
}
export interface PinataPinByHashResponse {
    id: number | string;
    ipfsHash: string;
    status: string;
    name: string;
}
export default function pinByHash(config: PinataConfig, hashToPin: string, options: any): Promise<any>;
