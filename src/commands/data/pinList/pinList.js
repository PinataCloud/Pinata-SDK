import axios from 'axios';
import { baseUrl } from './../../../constants';
import { createConfigForAxiosHeaders } from '../../../util/validators';
import { handleError } from '../../../util/errorResponse';
import queryBuilder from './queryBuilder';

/**
 * Pin List
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {any} filters
 * @returns {Promise<unknown>}
 */
export default function pinList(config, filters = {}) {
    filters = {...filters, ...{includeCount: 'false' }};

    const baseEndpoint = `${baseUrl}/data/pinList`;
    const endpoint = queryBuilder(baseEndpoint, filters);

    return new Promise((resolve, reject) => {
        axios.get(
            endpoint,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
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
