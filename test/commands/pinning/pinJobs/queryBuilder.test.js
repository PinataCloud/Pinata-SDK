import queryBuilder from './../../../../src/commands/pinning/pinJobs/queryBuilder';

const baseUrl = 'testing.com/test';
const badFilterValue = 'badFilterValue';
const goodHashToPin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

describe('queryBuilder no params provided', () => {
    test('if no baseUrl is provided', () => {
        expect(() => {
            queryBuilder();
        }).toThrow('no baseUrl provided');
    });
    test('if no filters are provided, return base url', () => {
        expect(queryBuilder(baseUrl)).toEqual(baseUrl);
    });
});

describe('queryBuilder multiple filters', () => {
    test('one bad filter and one good are provided', () => {
        const filter = {
            limit: 5,
            offset: badFilterValue
        };
        expect(() => {
            queryBuilder(baseUrl, filter);
        }).toThrow(`Invalid offset: ${badFilterValue}. Please provide a positive integer for the offset`);
    });
    test('two good filters are provided', () => {
        const filter = {
            status: 'searching',
            offset: 5
        };
        expect(queryBuilder(baseUrl, filter)).toEqual(`${baseUrl}?status=searching&offset=5`);
    });
});

describe('queryBuilder filter: sort', () => {
    test('unknown sort is provided', () => {
        const filter = {
          sort: badFilterValue
        };
        expect(() => {
            queryBuilder(baseUrl, filter);
        }).toThrow(`Unknown sort value: ${badFilterValue} provided`);
    });
    test('good sort value is provided', () => {
        const filter = {
            sort: 'ASC'
        };
        expect(queryBuilder(baseUrl, filter)).toEqual(`${baseUrl}?sort=ASC`);
    });
});

describe('queryBuilder filter: status', () => {
    test('unknown status is provided', () => {
        const filter = {
            status: badFilterValue
        };
        expect(() => {
            queryBuilder(baseUrl, filter);
        }).toThrow(`Unknown status value: ${badFilterValue} provided`);
    });
    test('good status value is provided', () => {
        const filter = {
            status: 'searching'
        };
        expect(queryBuilder(baseUrl, filter)).toEqual(`${baseUrl}?status=searching`);
    });
});

describe('queryBuilder filter: ipfs_pin_hash', () => {
    test('bad hash is provided', () => {
        const filter = {
            ipfs_pin_hash: badFilterValue
        };
        expect(() => {
            queryBuilder(baseUrl, filter);
        }).toThrow(`Invalid IPFS hash: ${badFilterValue}`);
    });
    test('good hash is provided', () => {
        const filter = {
            ipfs_pin_hash: goodHashToPin
        };
        expect(queryBuilder(baseUrl, filter)).toEqual(`${baseUrl}?ipfs_pin_hash=${goodHashToPin}`);
    });
});

describe('queryBuilder filter: limit', () => {
    test('bad hash is provided', () => {
        const filter = {
            limit: badFilterValue
        };
        expect(() => {
            queryBuilder(baseUrl, filter);
        }).toThrow(`Invalid limit: ${badFilterValue}. Valid limits are 1-100`);
    });
    test('good limit is provided', () => {
        const filter = {
            limit: 5
        };
        expect(queryBuilder(baseUrl, filter)).toEqual(`${baseUrl}?limit=5`);
    });
});

describe('queryBuilder filter: offset', () => {
    test('bad hash is provided', () => {
        const filter = {
            offset: badFilterValue
        };
        expect(() => {
            queryBuilder(baseUrl, filter);
        }).toThrow(`Invalid offset: ${badFilterValue}. Please provide a positive integer for the offset`);
    });
    test('good offset is provided', () => {
        const filter = {
            offset: 5
        };
        expect(queryBuilder(baseUrl, filter)).toEqual(`${baseUrl}?offset=5`);
    });
});
