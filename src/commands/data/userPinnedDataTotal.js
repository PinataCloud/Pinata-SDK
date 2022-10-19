import axios from 'axios';
import { baseUrl } from './../../constants';
import { createConfigForAxiosHeaders } from '../../util/validators';
import { handleError } from '../../util/errorResponse';

/**
 * User Pinned Data Total
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @returns {Promise<unknown>}
 */
export default function userPinnedDataTotal(config) {
    let endpoint = `${baseUrl}/data/userPinnedDataTotal`;

    return new Promise((resolve, reject) => {
        axios.get(
            endpoint,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while attempting to retrieve pinned data total: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
