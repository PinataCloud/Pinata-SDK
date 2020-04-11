import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validatePinPolicyStructure } from '../../util/validators';
import isIPFS from 'is-ipfs';

export default function hashPinPolicy(pinataApiKey, pinataSecretApiKey, ipfsPinHash, newPinPolicy) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);
    validatePinPolicyStructure(newPinPolicy);

    if (!ipfsPinHash) {
        throw new Error('ipfsPinHash value is required for changing the pin policy of a pin');
    }

    if (!isIPFS.cid(ipfsPinHash)) {
        throw new Error('ipfsPinHash value is an invalid IPFS CID');
    }

    if (!newPinPolicy) {
        throw new Error('newPinPolicy is required for changing the pin policy of a pin');
    }

    const endpoint = `${baseUrl}/pinning/hashPinPolicy`;
    const body = {
        ipfsPinHash: ipfsPinHash,
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
                reject(new Error(`unknown server response while changing pin policy for hash: ${result}`));
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
