import NodeFormData from 'form-data';

import { PinataConfig } from '../..';
import {
    PinataPinOptions,
    PinataPinResponse,
    uploadToIPFS
} from './pinFileToIPFS';
import fs from 'fs';

import path from 'path';

export function normalizePath(p: string, folderLevel = 2) {
    const splitPath = path
        .normalize(p)
        .split(path.sep)
        .filter((file) => file.length > 0 && file !== '..');
    let folderFile = splitPath;
    if (splitPath.length > 1) {
        folderFile = splitPath.slice(splitPath.length - folderLevel);
    }

    return path.join.apply(null, folderFile);
}

async function readdirRecursive(dir: string) {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    const files: any = await Promise.all(
        dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? readdirRecursive(res) : res;
        })
    );
    return Array.prototype.concat(...files);
}

export default async function pinFromFS(
    config: PinataConfig,
    sourcePath: string,
    options?: PinataPinOptions
): Promise<PinataPinResponse> {
    const sourcePathNormalize = path.normalize(sourcePath);
    try {
        const stats = await fs.promises.stat(sourcePathNormalize);
        if (stats.isFile()) {
            const stream = fs.createReadStream(sourcePathNormalize);
            const data = new NodeFormData();

            data.append('file', stream, {
                filename: path.basename(sourcePathNormalize)
            });

            return uploadToIPFS(config, data, options);
        }
        // upload a folder
        const data = new NodeFormData();
        const files = await readdirRecursive(sourcePathNormalize);

        files.forEach((file) => {
            data.append('file', fs.createReadStream(file), {
                filepath: path.join(
                    normalizePath(sourcePathNormalize, 1),
                    file.substring(sourcePathNormalize.length, file.length)
                )
            });
        });

        return uploadToIPFS(config, data, options);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
