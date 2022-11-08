import './require-babel-polyfill';
import pinByHash, {
    PinataPinByHashPinOptions
} from './commands/pinning/pinByHash';
import hashMetadata from './commands/pinning/hashMetadata';
import pinFileToIPFS, {
    PinataPinOptions
} from './commands/pinning/pinFileToIPFS';
import pinFromFS from './commands/pinning/pinFromFS';
import pinJSONToIPFS from './commands/pinning/pinJSONToIPFS';
import pinJobs, {
    PinataPinJobsFilterOptions
} from './commands/pinning/pinJobs/pinJobs';
import unpin from './commands/pinning/unpin';
import testAuthentication from './commands/data/testAuthentication';
import pinList, {
    PinataMetadata,
    PinataPinListFilterOptions
} from './commands/data/pinList/pinList';
import getFilesByCount from './commands/data/getFilesByCount/getFilesByCount';
import userPinnedDataTotal from './commands/data/userPinnedDataTotal';

export interface PinataConfig {
    pinataApiKey?: string;
    pinataSecretApiKey?: string;
    pinataJWTKey?: string;
}

function refactorConfig(pinataConfigParam: PinataConfig): PinataConfig {
    const config: PinataConfig = {};
    if (pinataConfigParam.pinataApiKey) {
        config.pinataApiKey = pinataConfigParam.pinataApiKey;
    }

    if (pinataConfigParam.pinataSecretApiKey) {
        config.pinataSecretApiKey = pinataConfigParam.pinataSecretApiKey;
    }

    if (pinataConfigParam.pinataJWTKey) {
        config.pinataJWTKey = pinataConfigParam.pinataJWTKey;
    }

    return config;
}
function sanitizeConfig(
    pinataApiKey?: string | PinataConfig,
    pinataSecretApiKey?: string
): PinataConfig {
    let config: PinataConfig = {};

    if (
        typeof pinataApiKey === 'string' &&
        typeof pinataSecretApiKey === 'string'
    ) {
        config.pinataApiKey = pinataApiKey;
        config.pinataSecretApiKey = pinataSecretApiKey;
    }

    const isPinataConfigParam = typeof pinataApiKey === 'object';
    if (isPinataConfigParam) {
        config = refactorConfig(pinataApiKey);
    }

    return config;
}

class PinataClient {
    config: PinataConfig;

    constructor(
        pinataApiKey?: string | PinataConfig,
        pinataSecretApiKey?: string
    ) {
        this.config = sanitizeConfig(pinataApiKey, pinataSecretApiKey);
    }

    pinByHash(hashToPin: string, options?: PinataPinByHashPinOptions) {
        return pinByHash(this.config, hashToPin, options);
    }

    hashMetadata(ipfsPinHash: string, metadata: PinataMetadata) {
        return hashMetadata(this.config, ipfsPinHash, metadata);
    }

    pinFileToIPFS(readableStream: any, options?: PinataPinOptions) {
        return pinFileToIPFS(this.config, readableStream, options);
    }

    pinFromFS(sourcePath: string, options?: PinataPinOptions) {
        return pinFromFS(this.config, sourcePath, options);
    }
    pinJSONToIPFS(body: any, options?: PinataPinOptions) {
        return pinJSONToIPFS(this.config, body, options);
    }
    pinJobs(filters?: PinataPinJobsFilterOptions) {
        return pinJobs(this.config, filters);
    }
    unpin(hashToUnpin: string) {
        return unpin(this.config, hashToUnpin);
    }

    pinList(filters: PinataPinListFilterOptions) {
        return pinList(this.config, filters);
    }

    getFilesByCount(filters: PinataPinListFilterOptions, maxCount?: number) {
        return getFilesByCount(this.config, filters, maxCount);
    }

    testAuthentication() {
        return testAuthentication(this.config);
    }
    userPinnedDataTotal() {
        return userPinnedDataTotal(this.config);
    }
}

module.exports = PinataClient;

export * from './commands/data';
export * from './commands/pinning';

export default PinataClient;

