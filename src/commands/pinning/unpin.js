import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys } from '../../util/validators';
import isIPFS from 'is-ipfs';

export default function unpin(pinataApiKey, pinataSecretApiKey, hashToUnpin) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    if (!hashToUnpin) {
        throw new Error('hashToUnpin value is required for removing a pin from Pinata');
    }
    if (!isIPFS.cid(hashToUnpin)) {
        throw new Error(`${hashToUnpin} is an invalid IPFS CID`);
    }

    const endpoint = `${baseUrl}/pinning/unpin/${hashToUnpin}`;

    return new Promise((resolve, reject) => {
        axios.delete(
            endpoint,
            {
                withCredentials: true,
                headers: {
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }).then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while removing pin from IPFS: ${result}`));
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
