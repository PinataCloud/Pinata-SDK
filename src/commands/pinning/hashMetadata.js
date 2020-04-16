import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validateMetadata } from '../../util/validators';
import isIPFS from 'is-ipfs';

export default function hashMetadata(pinataApiKey, pinataSecretApiKey, ipfsPinHash, metadata) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    if (!ipfsPinHash) {
        throw new Error('ipfsPinHash value is required for changing the pin policy of a pin');
    }

    if (!isIPFS.cid(ipfsPinHash)) {
        throw new Error('ipfsPinHash value is an invalid IPFS CID');
    }

    if (!metadata) {
        throw new Error('no metadata object provided');
    }

    validateMetadata(metadata);

    const endpoint = `${baseUrl}/pinning/hashMetadata`;
    const body = {
        ipfsPinHash: ipfsPinHash
    };

    if (metadata.name) {
        body.name = metadata.name;
    }

    if (metadata.keyvalues) {
        body.keyvalues = metadata.keyvalues;
    }

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
                reject(new Error(`unknown server response while changing metadata for hash: ${result}`));
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
