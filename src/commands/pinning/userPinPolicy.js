import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validatePinPolicyStructure } from '../../util/validators';
import { handleError } from '../../util/errorResponse';

/**
 * User Pin Policy
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} newPinPolicy
 * @returns {Promise<unknown>}
 */
export default function userPinPolicy(pinataApiKey, pinataSecretApiKey, newPinPolicy) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);
    validatePinPolicyStructure(newPinPolicy);

    if (!newPinPolicy) {
        throw new Error('newPinPolicy is required for changing the pin policy of a pin');
    }

    const endpoint = `${baseUrl}/pinning/userPinPolicy`;
    const body = {
        newPinPolicy: newPinPolicy
    };

    return new Promise((resolve, reject) => {
        axios.put(
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
                reject(new Error(`unknown server response while changing pin policy for user: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
