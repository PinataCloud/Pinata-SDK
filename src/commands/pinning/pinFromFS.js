import axios from 'axios';
import { baseUrl } from './../../constants';
import NodeFormData from 'form-data';
import {validateApiKeys, validateMetadata, validatePinataOptions} from '../../util/validators';
import basePathConverter from 'base-path-converter';
import { handleError } from '../../util/errorResponse';
const fs = require('fs');
const recursive = require('recursive-fs');

/**
 * PinFromFS
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {string} sourcePath
 * @param {*} options
 * @returns {Promise<unknown>}
 */
export default function pinFromFS(pinataApiKey, pinataSecretApiKey, sourcePath, options) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    return new Promise((resolve, reject) => {
        const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

        fs.stat(sourcePath, (err, stats) => {
            if (err) {
                reject(err);
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
                    {
                        withCredentials: true,
                        maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                        maxBodyLength: 'Infinity',
                        headers: {
                            'Content-type': `multipart/form-data; boundary= ${data._boundary}`,
                            'pinata_api_key': pinataApiKey,
                            'pinata_secret_api_key': pinataSecretApiKey
                        }
                    }).then(function (result) {
                    if (result.status !== 200) {
                        reject(new Error(`unknown server response while pinning File to IPFS: ${result}`));
                    }
                    resolve(result.data);
                }).catch(function (error) {
                    const formattedError = handleError(error);
                    reject(formattedError);
                });
            } else {
                recursive.readdirr(sourcePath, function (err, dirs, files) {
                    if (err) {
                        reject(new Error(err));
                    }

                    let data = new NodeFormData();

                    files.forEach((file) => {
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
                        {
                            withCredentials: true,
                            maxContentLength: 'Infinity',
                            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                            headers: {
                                'Content-type': `multipart/form-data; boundary= ${data._boundary}`,
                                'pinata_api_key': pinataApiKey,
                                'pinata_secret_api_key': pinataSecretApiKey
                            }
                        }).then(function (result) {
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
