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
export default function pinJobs(config: PinataConfig, filters?: PinataPinJobsFilterOptions): Promise<PinataPinJobsResponse>;
