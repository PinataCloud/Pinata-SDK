import axios from 'axios';
import { baseUrl } from '../../constants';
import NodeFormData from 'form-data';
import stream from 'stream';
import {
    createConfigForAxiosHeadersWithFormData,
    validateMetadata,
    validatePinataOptions
} from '../../util/validators';
import { handleError } from '../../util/errorResponse';
import { PinataConfig, PinataMetadata } from '../..';

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
    pinataMetadata?: PinataMetadata;
    pinataOptions?: PinataOptions | undefined;
}
const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

export function uploadToIPFS(
    config: PinataConfig,
    data: NodeFormData,
    options?: PinataPinOptions
): Promise<PinataPinResponse> {
    return new Promise((resolve, reject) => {
        if (options && options.pinataMetadata) {
            validateMetadata(options.pinataMetadata);
            data.append(
                'pinataMetadata',
                JSON.stringify(options.pinataMetadata)
            );
        }
        if (options && options.pinataOptions) {
            validatePinataOptions(options.pinataOptions);
            data.append('pinataOptions', JSON.stringify(options.pinataOptions));
        }

        axios
            .post(
                endpoint,
                data,
                createConfigForAxiosHeadersWithFormData(
                    config,
                    data.getBoundary()
                )
            )
            .then(function (result) {
                if (result.status !== 200) {
                    reject(
                        new Error(
                            `unknown server response while pinning File to IPFS: ${result}`
                        )
                    );
                }
                resolve(result.data);
            })
            .catch(function (error) {
                const formattedError = handleError(error);
                reject(formattedError);
            });
    });
}

export default function pinFileToIPFS(
    config: PinataConfig,
    readStream: any,
    options?: PinataPinOptions
): Promise<PinataPinResponse> {
    return new Promise((resolve, reject) => {
        const data = new NodeFormData();

        if (
            !(
                options?.pinataMetadata?.name &&
                typeof options.pinataMetadata.name === 'string' &&
                options.pinataMetadata.name.length > 0
            )
        ) {
            throw Error(
                'filename was not provide, make sure to provide options.pinataMetadata.name'
            );
        }

        data.append('file', readStream, {
            filename: options.pinataMetadata.name
        });

        if (
            !(
                readStream instanceof stream.Readable ||
                readStream instanceof NodeFormData
            )
        ) {
            reject(
                new Error('readStream is not a readable stream or form data')
            );
        }

        resolve(uploadToIPFS(config, data, options));
    });
}
