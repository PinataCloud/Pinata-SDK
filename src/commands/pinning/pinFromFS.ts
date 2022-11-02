
import NodeFormData from 'form-data';

import basePathConverter from 'base-path-converter';
import { PinataConfig } from '../..';
import {
    PinataPinOptions,
    PinataPinResponse,
    uploadToIPFS
} from './pinFileToIPFS';
import fs from 'fs';

import path from 'path';

export default async function pinFromFS(
    config: PinataConfig,
    sourcePath: string,
    options?: PinataPinOptions
): Promise<PinataPinResponse> {
    try {
        const stats = await fs.promises.stat(sourcePath);
        if (stats.isFile()) {

            const stream = fs.createReadStream(sourcePath);
            const data = new NodeFormData();

            data.append('file', stream, {
                filename: path.basename(sourcePath)
            });

            return uploadToIPFS(config, data, options);
        }
            const files = await fs.promises.readdir(sourcePath);
            const data = new NodeFormData();

            files.forEach((file: string) => {
                //for each file stream, we need to include the correct relative file path
                data.append('file', fs.createReadStream(file), {
                    filepath: basePathConverter(sourcePath, file)
                });
            });

            return uploadToIPFS(config, data, options);

    } catch (err) {
        console.log(err);
        throw err;
    }

}
