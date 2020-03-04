import { validateApiKeys, validateHostNodes, validateMetadata, validatePinPolicyStructure, validatePinataOptions } from "../../src/util/validators";

describe('validateApiKeys function testing', () => {
    test('check to throw if either pinataApiKey or pinataSecretApiKey are not provided', () => {
        expect(() => {
            validateApiKeys('', 'test');
        }).toThrow('No pinataApiKey provided! Please provide your pinata api key as an argument when you start this script');
        expect(() => {
            validateApiKeys('test', '');
        }).toThrow('No pinataSecretApiKey provided! Please provide your pinata secret api key as an argument when you start this script');
    });
});

describe('validateHostNodes function testing', () => {
    test('host_nodes is not an array', () => {
        const hostNodes = {
            test: 'test'
        };
        expect(() => {
            validateHostNodes(hostNodes);
        }).toThrow('host_nodes value must be an array');
    });

    test('invalid host_node entry', () => {
        const validHost = '/ip4/127.0.0.1/tcp/1234/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj';
        const invalidHost = 'invalid host';
        const hostNodes = [
            validHost,
            invalidHost
        ];
        expect(() => {
            validateHostNodes(hostNodes);
        }).toThrow(`host_node array entry: ${invalidHost} is not a valid peer multiaddr`);
    });
});


describe('validateMetadata function testing', () => {
    test('name is not a string', () => {
        const badName = {
            test: 'testing'
        };
        expect(() => {
            validateMetadata({
                name: badName
            });
        }).toThrow('metadata name must be of type string');
    });
    test('keyvalues is not an object', () => {
        const badKeyValues = 'testing';
        expect(() => {
            validateMetadata({
                keyvalues: badKeyValues
            });
        }).toThrow('metatadata keyvalues must be an object');
    });

    test('more than 10 keyvalues was provided', () => {
        const tooManyKeyValues = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11
        };
        expect(() => {
            validateMetadata({
                keyvalues: tooManyKeyValues
            });
        }).toThrow('No more than 10 keyvalues can be provided for metadata entries');
    });
    test('Throws error on an object being passed in as a value for a keyvalue', () => {
        const invalidValue = {
            one: 1,
            two: {
                test: 'test'
            },
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11
        };
        expect(() => {
            validateMetadata({
                keyvalues: invalidValue
            });
        }).toThrow('Metadata keyvalue values must be strings, booleans, or numbers');
    });
    test('Does not throw an error if metadata is valid', () => {
        const invalidValue = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10
        };
        expect(() => {
            validateMetadata({
                keyvalues: invalidValue
            });
        }).not.toThrow();
    });
});

describe('validatePinPolicyStructure function testing', () => {
    test('No Policy Provided', () => {
        expect(() => {
            validatePinPolicyStructure();
        }).toThrow("No pin policy provided");
    });
    test('No Regions Provided', () => {
        expect(() => {
            validatePinPolicyStructure({
                test: 'test'
            });
        }).toThrow("No regions provided in pin policy");
    });
    test('region id is not a string', () => {
        expect(() => {
            validatePinPolicyStructure({
                regions: [
                    {
                        id: 'goodRegionId',
                        desiredReplicationCount: 1
                    },
                    {
                        id: 0,
                        desiredReplicationCount: 1
                    }
                ]
            });
        }).toThrow("region id must be a string");
    });
    test('desiredReplicationCount is not an integer', () => {
        expect(() => {
            validatePinPolicyStructure({
                regions: [
                    {
                        id: 'goodRegionId',
                        desiredReplicationCount: 1
                    },
                    {
                        id: 'goodRegionId2',
                        desiredReplicationCount: 'string that should fail'
                    }
                ]
            });
        }).toThrow("desiredReplicationCount must be an integer");
    });
});


describe('validatePinataOptions function testing', () => {
    test('options is not an object', () => {
        expect(() => {
            validatePinataOptions('test');
        }).toThrow('options must be an object');
    });
    test('cidVersion is not a 0 or 1', () => {
        const badVersion = {
            test: 'testing'
        };
        expect(() => {
            validatePinataOptions({
                cidVersion: badVersion
            });
        }).toThrow('unsupported or invalid cidVersion');
    });
    test('wrapWithDirectory is not true or false', () => {
        expect(() => {
            validatePinataOptions({
                wrapWithDirectory: 'test'
            });
        }).toThrow('wrapWithDirectory must be a boolean value of true or false');
    });
});
