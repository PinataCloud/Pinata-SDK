import axios from 'axios';
import { baseUrl } from './../../../constants';
import { createConfigForAxiosHeaders } from '../../../util/validators';
import queryBuilder from './queryBuilder';
import { handleError } from '../../../util/errorResponse';

/**
 * Pin Jobs
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} filters
 * @returns {Promise<unknown>}
 */
export default function pinJobs(config, filters) {

    let endpoint = `${baseUrl}/pinning/pinJobs`;

    if (filters) {
        endpoint = queryBuilder(endpoint, filters);
    }

    return new Promise((resolve, reject) => {
        axios.get(
            endpoint,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
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
