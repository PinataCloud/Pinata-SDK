import axios from 'axios';
import { baseUrl } from '../../constants';
import NodeFormData from 'form-data';
import {createConfigForAxiosHeadersWithFormData, validateMetadata, validatePinataOptions} from '../../util/validators';
import basePathConverter from 'base-path-converter';
import { handleError } from '../../util/errorResponse';
import { PinataConfig } from '../..';
import { PinataPinOptions, PinataPinResponse } from './pinFileToIPFS';
import * as fs from 'fs';
import * as recursive from 'recursive-fs';

export default function pinFromFS(config: PinataConfig, sourcePath: string, options?: PinataPinOptions): Promise<PinataPinResponse> {

    return new Promise((resolve, reject) => {
        const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

        // eslint-disable-next-line consistent-return
        fs.stat(sourcePath, (err: any, stats: any) => {
            if (err) {
                return reject(err);
            }
            if (stats.isFile()) {
                //we need to create a single read stream instead of reading the directory recursively
                const data = new NodeFormData();

                data.append('file', fs.createReadStream(sourcePath));

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
                    data,
                    createConfigForAxiosHeadersWithFormData(config, data.getBoundary()))
                .then(function (result) {
                    if (result.status !== 200) {
                        reject(new Error(`unknown server response while pinning File to IPFS: ${result}`));
                    }
                    resolve(result.data);
                }).catch(function (error) {
                    const formattedError = handleError(error);
                    reject(formattedError);
                });
            } else {
                recursive.readdirr(sourcePath, function (err: any, dirs: any, files: any) {
                    if (err) {
                        reject(new Error(err));
                    }

                    const data = new NodeFormData();

                    files.forEach((file: any) => {
                        //for each file stream, we need to include the correct relative file path
                        data.append('file', fs.createReadStream(file), {
                            filepath: basePathConverter(sourcePath, file)
                        });
                    });

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
                        data,
                        createConfigForAxiosHeadersWithFormData(config, data.getBoundary()))
                    .then(function (result) {
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
        });
    });
}
