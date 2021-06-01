import axios from 'axios';
import { baseUrl } from './../../../constants';
import { validateApiKeys } from '../../../util/validators';
import { handleError } from '../../../util/errorResponse';
import queryBuilder from './queryBuilder';

/**
 * Pin List
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {string} filters
 * @returns {Promise<unknown>}
 */
export default function pinList(pinataApiKey, pinataSecretApiKey, filters) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    const baseEndpoint = `${baseUrl}/data/pinList`;
    const endpoint = queryBuilder(baseEndpoint, filters);

    return new Promise((resolve, reject) => {
        axios.get(
            endpoint,
            {
                withCredentials: true,
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }).then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while attempting to retrieve user pin list: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
