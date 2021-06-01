import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validateMetadata, validatePinataOptions } from '../../util/validators';
import { handleError } from '../../util/errorResponse';

/**
 * Pin JSON to IPFS
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} body
 * @param {*} options
 * @returns {Promise<unknown>}
 */
export default function pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, body, options) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    let requestBody = body;

    if (typeof body !== 'object') {
        throw new Error('body must be a valid JSON object');
    }

    if (options) {
        requestBody = {
            pinataContent: body
        };
        if (options.pinataMetadata) {
            validateMetadata(options.pinataMetadata);
            requestBody.pinataMetadata = options.pinataMetadata;
        }
        if (options.pinataOptions) {
            validatePinataOptions(options.pinataOptions);
            requestBody.pinataOptions = options.pinataOptions;
        }
    }

    const endpoint = `${baseUrl}/pinning/pinJSONToIPFS`;

    return new Promise((resolve, reject) => {
        axios.post(
            endpoint,
            requestBody,
            {
                withCredentials: true,
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }).then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while pinning JSON to IPFS: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
