import { PinataConfig } from '../../..';
export interface PinataPinRegion {
    regionId: string;
    currentReplicationCount: number;
    desiredReplicationCount: number;
}
export interface PinataMetadata {
    [key: string]: string | number | null;
}
export interface PinataMetadataFilter {
    name?: string | undefined;
    keyvalues: {
        [key: string]: {
            value: string | number | null;
            op: string;
        };
    };
}
export interface PinataPin {
    id: string | number;
    ipfs_pin_hash: string;
    size: number;
    user_id: string | number;
    date_pinned: string;
    date_unpinned: string | null;
    metadata: PinataMetadata;
    regions: PinataPinRegion[];
}
export declare type PinataPinListFilterOptions = {
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
export default function pinList(config: PinataConfig, filters?: PinataPinListFilterOptions): Promise<PinataPinListResponse>;
