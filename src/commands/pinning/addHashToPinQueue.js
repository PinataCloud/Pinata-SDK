import axios from 'axios';
import { baseUrl } from './../../constants';
import { validateApiKeys, validateHostNodes, validateMetadata } from '../../util/validators';
import isIPFS from 'is-ipfs';

export default function addHashToPinQueue(pinataApiKey, pinataSecretApiKey, hashToPin, options) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    if (!hashToPin) {
        throw new Error('hashToPin value is required for adding a hash to the pin queue');
    }
    if (!isIPFS.cid(hashToPin)) {
        throw new Error('hashToPin value is an invalid IPFS CID');
    }

    const endpoint = `${baseUrl}/pinning/addHashToPinQueue`;
    const body = {
        hashToPin: hashToPin
    };

    if (options) {
        if (options.host_nodes) {
            validateHostNodes(options.host_nodes);
            body.host_nodes = options.host_nodes;
        }
        if (options.pinataMetadata) {
            validateMetadata(options.pinataMetadata);
            body.pinataMetadata = options.pinataMetadata;
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(
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
                reject(new Error(`unknown server response while adding to pin queue: ${result}`));
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
