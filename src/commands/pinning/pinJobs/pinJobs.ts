import axios from 'axios';
import { baseUrl } from '../../../constants';
import { createConfigForAxiosHeaders } from '../../../util/validators';
import queryBuilder from './queryBuilder';
import { handleError } from '../../../util/errorResponse';
import { PinataConfig } from '../../..';

export interface PinataPinJobsResponseRow {
    id: number | string;
    ipfs_pin_hash: string;
    date_queued: string;
    name: string | undefined | null;
    status: string;
}
export interface PinataPinJobsResponse {
    count: number;
    rows: PinataPinJobsResponseRow[];
}

export interface PinataPinJobsFilterOptions {
    sort: 'ASC' | 'DESC';
    status?: string | undefined;
    ipfs_pin_hash?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}

export default function pinJobs(config: PinataConfig, filters? : PinataPinJobsFilterOptions): Promise<PinataPinJobsResponse> {

    let endpoint = `${baseUrl}/pinning/pinJobs`;

    if (filters) {
        endpoint = queryBuilder(endpoint, filters);
    }

    return new Promise((resolve, reject) => {
        axios.get(
            endpoint,
            {...createConfigForAxiosHeaders(config)})
        .then(function (result) {
            if (result.status !== 200) {
                reject(new Error(`unknown server response while attempting to retrieve pin jobs: ${result}`));
            }
            resolve(result.data);
        }).catch(function (error) {
            const formattedError = handleError(error);
            reject(formattedError);
        });
    });
}
