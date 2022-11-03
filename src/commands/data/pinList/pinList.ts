import axios from 'axios';
import { baseUrl } from '../../../constants';
import { createConfigForAxiosHeaders } from '../../../util/validators';
import { handleError } from '../../../util/errorResponse';
import queryBuilder from './queryBuilder';
import { PinataConfig } from '../../..';
export interface PinataPinRegion {
    regionId: string;
    currentReplicationCount: number;
    desiredReplicationCount: number;
}

export interface PinataMetadata { [key: string]: string | number | null }
export interface PinataMetadataFilter {
    name?: string | undefined;
    keyvalues: { [key: string]: {
        value: string | number | null;
        op: string;
    } }
}
export interface PinataPin {
    id: string | number;
    ipfs_pin_hash: string;
    size: number;
    user_id: string | number;
    date_pinned: string;
    date_unpinned: string | null;
    metadata: PinataMetadata,
    regions: PinataPinRegion[];
}

export type PinataPinListFilterOptions = {
    hashContains?: string | undefined;
    pinStart?: string | undefined;
    pinEnd?: string | undefined;
    unpinStart?: string | undefined;
    unpinEnd?: string | undefined;
    pinSizeMin?: number | undefined;
    pinSizeMax?: number | undefined;
    status?: string | undefined;
    pageLimit?: number | undefined;
    pageOffset?: number | undefined;
    metadata?: PinataMetadataFilter | undefined;
};

export interface PinataPinListResponse {
    rows: PinataPin[];
}

export default function pinList(
    config: PinataConfig,
    filters:PinataPinListFilterOptions = {}
): Promise<PinataPinListResponse> {
    filters = { ...filters, ...{ includeCount: 'false' } };

    const baseEndpoint = `${baseUrl}/data/pinList`;
    const endpoint = queryBuilder(baseEndpoint, filters);

    return new Promise((resolve, reject) => {
        axios
            .get(endpoint, { ...createConfigForAxiosHeaders(config) })
            .then(function (result) {
                if (result.status !== 200) {
                    reject(
                        new Error(
                            `unknown server response while attempting to retrieve user pin list: ${result}`
                        )
                    );
                }
                resolve(result.data);
            })
            .catch(function (error) {
                const formattedError = handleError(error);
                reject(formattedError);
            });
    });
}
