import axios from 'axios';
import { baseUrl } from '../../constants';
import NodeFormData from 'form-data';
import stream from 'stream';
import {createConfigForAxiosHeadersWithFormData, validateMetadata, validatePinataOptions} from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { PinataConfig } from '../..';

export interface PinataPinPolicyItem {
    id: string;
    desiredReplicationCount: number;
}
export interface PinataOptions {
    hostNodes?: string[] | undefined;
    cidVersion?: 0 | 1 ;
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
    pinataMetadata?: { [key: string]: string | number | null },
    pinataOptions?: PinataOptions | undefined;
}

export default function pinFileToIPFS(config: PinataConfig, readStream: any, options?: PinataPinOptions):Promise<PinataPinResponse> {
    return new Promise((resolve, reject) => {

        const data = new NodeFormData();

        data.append('file', readStream);

        const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

        if (!(readStream instanceof stream.Readable || readStream instanceof NodeFormData)) {
            reject(new Error('readStream is not a readable stream or form data'));
        }

        if (options) {
            if (options.pinataMetadata) {
                validateMetadata(options.pinataMetadata);
                data.append('pinataMetadata', JSON.stringify(options.pinataMetadata));
            }
            if (options.pinataOptions) {
                validatePinataOptions(options.pinataOptions);
                data.append('pinataOptions', JSON.stringify(options.pinataOptions));
            }
        }
           axios.post(
            endpoint,
            readStream instanceof NodeFormData ? readStream : data,
            createConfigForAxiosHeadersWithFormData(config, data.getBoundary())
        ).then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while pinning File to IPFS: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
