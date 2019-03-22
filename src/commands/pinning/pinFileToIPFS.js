import axios from 'axios';
import { baseUrl } from './../../constants';
import NodeFormData from 'form-data';
import stream from 'stream';
import { validateApiKeys } from '../../util/validators';

export default function pinFileToIPFS(pinataApiKey, pinataSecretApiKey, readStream, options) {
    validateApiKeys(pinataApiKey, pinataSecretApiKey);

    return new Promise((resolve, reject) => {

        const data = new NodeFormData();

        data.append('file', readStream);

        const endpoint = `${baseUrl}/pinning/pinFileToIPFS`;

        if (!(readStream instanceof stream.Readable)) {
            reject({
                error: 'readStream is not a readable stream'
            });
        }

        axios.post(
            endpoint,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-type': `multipart/form-data; boundary= ${data._boundary}`,
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }).then(function (result) {
            if (result.status !== 200) {
                reject({
                    error: `unknown server response while pinning File to IPFS: ${result}`
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
