
import NodeFormData from 'form-data';

import { PinataConfig } from '../..';
import {
    PinataPinOptions,
    PinataPinResponse,
    uploadToIPFS
} from './pinFileToIPFS';
import fs from 'fs';

import path from 'path';

export function normalizePath(p: string) {
    const splitPath = path.normalize(p).split(path.sep).filter(file => file.length > 0 && file !== '..');
    let folderFile = splitPath;
    if (splitPath.length > 1) {
        folderFile = splitPath.slice(splitPath.length - 2);
    }

    return path.join.apply(null, folderFile);
}

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

                const filepath = path.join(sourcePath, file);
                //for each file stream, we need to include the correct relative file path
                data.append('file', fs.createReadStream(filepath), {
                    filepath: normalizePath(filepath)
                });
            });

            return uploadToIPFS(config, data, options);

    } catch (err) {
        console.log(err);
        throw err;
    }

}
