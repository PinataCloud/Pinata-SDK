import axios from 'axios';
import { baseUrl } from './../../constants';
import {validateApiKeys} from '../../util/validators';
import { handleError } from '../../util/errorResponse';

/**
 * Test Authentication
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @returns {Promise<unknown>}
 */
export default function testAuthentication(pinataApiKey, pinataSecretApiKey) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    //  test authentication to make sure that the user's provided keys are legit
    const endpoint = `${baseUrl}/data/testAuthentication`;

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
                reject(new Error(`unknown server response while authenticating: ${result}`));
            }
            resolve({
                authenticated: true
            });
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
};
