import axios from 'axios';
import { baseUrl } from './../../../constants';
import { validateApiKeys } from '../../../util/validators';
import queryBuilder from './queryBuilder';

export default function userPinList(pinataApiKey, pinataSecretApiKey, filters) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    const baseEndpoint = `${baseUrl}/data/userPinList`;
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
                reject({
                    error: `unknown server response while attempting to retrieve user pin list: ${result}`
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
