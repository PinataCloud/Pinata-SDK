import axios from 'axios';
import { baseUrl } from '../../constants';
import { createConfigForAxiosHeaders } from '../../util/validators';
import isIPFS from 'is-ipfs';
import { handleError } from '../../util/errorResponse';
import { PinataConfig } from '../..';

export default function unpin(config: PinataConfig, hashToUnpin: string) {
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
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while removing pin from IPFS: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
