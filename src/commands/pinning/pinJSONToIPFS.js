import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validateMetadata } from '../../util/validators';

export default function pinJSONToIPFS(pinataApiKey, pinataSecretApiKey, body, options) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    let requestBody = body;

    if (typeof body !== 'object') {
        throw new Error('body must be a valid JSON object');
    }

    if (options) {
        if (options.pinataMetadata) {
            validateMetadata(options.pinataMetadata);
            requestBody = {
                pinataContent: body,
                pinataMetadata: options.pinataMetadata
            };
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
                reject({
                    error: `unknown server response while pinning JSON to IPFS: ${result}`
                });
            }
            resolve(result);
        }).catch(function (error) {
            //  handle error here
            if (error && error.response && error.response && error.response.data && error.response.data.error) {
                reject({
                    error: `${error.response.data.error}`
                });
            }
            reject({
                error: `${error}`
            });
        });
    });
}
