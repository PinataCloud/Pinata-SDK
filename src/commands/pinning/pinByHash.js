import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validateMetadata } from '../../util/validators';
import isIPFS from 'is-ipfs';
import { handleError } from '../../util/errorResponse';

/**
 * Pin By Hash
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} hashToPin
 * @param {*} options
 * @returns {Promise<unknown>}
 */
export default function pinByHash(pinataApiKey, pinataSecretApiKey, hashToPin, options) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    if (!hashToPin) {
        throw new Error('hashToPin value is required for pinning by hash');
    }
    if (!isIPFS.cid(hashToPin)) {
        throw new Error('hashToPin value is an invalid IPFS CID');
    }

    const endpoint = `${baseUrl}/pinning/pinByHash`;
    const body = {
        hashToPin: hashToPin,
        pinataOptions: {}
    };

    if (options) {
        if (options.pinataOptions) {
            body.pinataOptions = options.pinataOptions;
        }
        if (options.pinataMetadata) {
            validateMetadata(options.pinataMetadata);
            body.pinataMetadata = options.pinataMetadata;
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(
            endpoint,
            body,
            {
                withCredentials: true,
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }).then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while adding to pin queue: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
