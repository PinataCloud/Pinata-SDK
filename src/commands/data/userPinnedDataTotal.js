import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys } from '../../util/validators';

export default function userPinnedDataTotal(pinataApiKey, pinataSecretApiKey) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    let endpoint = `${baseUrl}/data/userPinnedDataTotal`;

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
                reject(new Error(`unknown server response while attempting to retrieve pinned data total: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            //  handle error here
            if (error && error.response && error.response && error.response.data && error.response.data.error) {
                reject(new Error(error.response.data.error));
            } else {
                reject(error);
            }
        });
    });
}
