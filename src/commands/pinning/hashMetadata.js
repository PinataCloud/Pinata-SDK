import axios from 'axios';
import { baseUrl } from './../../constants';
import { createConfigForAxiosHeaders, validateMetadata } from '../../util/validators';
import isIPFS from 'is-ipfs';
import { handleError } from '../../util/errorResponse';

/**
 * Hash Meta Data
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 * @param {*} ipfsPinHash
 * @param {*} metadata
 * @returns {Promise<unknown>}
 */
export default function hashMetadata(config, ipfsPinHash, metadata) {
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
            {...createConfigForAxiosHeaders(config)})
            .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while changing metadata for hash: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
