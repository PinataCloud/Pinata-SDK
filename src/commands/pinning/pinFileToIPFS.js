import axios from 'axios';
import { baseUrl } from './../../constants';
import NodeFormData from 'form-data';
import stream from 'stream';
import {createConfigForAxiosHeadersWithFormData, validateMetadata, validatePinataOptions} from '../../util/validators';
import { handleError } from '../../util/errorResponse';

/**
 * Pin File to IPFS
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} readStream
 * @param {*} options
 * @returns {Promise<unknown>}
 */
export default function pinFileToIPFS(config, readStream, options) {
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
            createConfigForAxiosHeadersWithFormData(config, data._boundary)
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
