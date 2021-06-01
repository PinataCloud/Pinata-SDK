import isIPFS from 'is-ipfs';

/**
 * Query Buidler
 * @param {string} baseUrl
 * @param {*} filters
 * @returns {*}
 */
export default function queryBuilder(baseUrl, filters) {
    if (!baseUrl) {
        throw new Error('no baseUrl provided');
    }

    if (!filters) {
        return baseUrl;
    }

    let newUrl = baseUrl;

    let firstFilterApplied = false; // we want to make sure that the "?" character is only applied once

    function addFilter(newFilter) {
        if (firstFilterApplied) {
            newUrl = `${newUrl}&${newFilter}`;
        } else {
            firstFilterApplied = true;
            newUrl = `${newUrl}?${newFilter}`;
        }
    }

    if (filters) {
        //  now we need to construct the actual URL based on the given filters provided
        if (filters.sort) {
            if (filters.sort === 'ASC' ||
                filters.sort === 'DESC') {
                addFilter(`sort=${filters.sort}`);
            } else {
                throw new Error(`Unknown sort value: ${filters.sort} provided`);
            }
        }

        if (filters.status) {
            if (filters.status === 'searching' ||
                filters.status === 'expired' ||
                filters.status === 'over_free_limit' ||
                filters.status === 'over_max_size' ||
                filters.status === 'invalid_object' ||
                filters.status === 'bad_host_node'
            ) {
                addFilter(`status=${filters.status}`);
            } else {
                throw new Error(`Unknown status value: ${filters.status} provided`);
            }
        }

        if (filters.ipfs_pin_hash) {
            if (isIPFS.cid(filters.ipfs_pin_hash)) {
                addFilter(`ipfs_pin_hash=${filters.ipfs_pin_hash}`);
            } else {
                throw new Error(`Invalid IPFS hash: ${filters.ipfs_pin_hash}`);
            }
        }

        if (filters.limit) {
            if (Number.isInteger(filters.limit) && (filters.limit > 0) && (filters.limit < 100)) {
                addFilter(`limit=${filters.limit}`);
            } else {
                throw new Error(`Invalid limit: ${filters.limit}. Valid limits are 1-100`);
            }
        }

        if (filters.offset) {
            if (Number.isInteger(filters.offset) && (filters.offset > 0)) {
                addFilter(`offset=${filters.offset}`);
            } else {
                throw new Error(`Invalid offset: ${filters.offset}. Please provide a positive integer for the offset`);
            }
        }
    }
    return newUrl;
}
