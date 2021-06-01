import axios from 'axios';
import { baseUrl } from './../../../constants';
import { validateApiKeys } from '../../../util/validators';
import queryBuilder from './queryBuilder';
import { handleError } from '../../../util/errorResponse';

/**
 * Pin Jobs
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} filters
 * @returns {Promise<unknown>}
 */
export default function pinJobs(pinataApiKey, pinataSecretApiKey, filters) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    let endpoint = `${baseUrl}/pinning/pinJobs`;

    if (filters) {
        endpoint = queryBuilder(endpoint, filters);
    }

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
                reject(new Error(`unknown server response while attempting to retrieve pin jobs: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
