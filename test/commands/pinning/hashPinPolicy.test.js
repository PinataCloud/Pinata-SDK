import axios from 'axios';
import hashPinPolicy from'../../../src/commands/pinning/hashPinPolicy';

jest.mock('axios');

//common values
const badHash = 'test';
const goodHash = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';
const newPinPolicy = {
    regions: [
        {
            id: 'FRA1',
            desiredReplicationCount: 2
        },
        {
            id: 'NYC1',
            desiredReplicationCount: 2
        }
    ]
};

test('No ipfsPinHash value provided should error', () => {
    expect(() => {
        hashPinPolicy('test', 'test', null, newPinPolicy);
    }).toThrow();
});

test('Invalid ipfsPinHash value is provided', () => {
    expect(() => {
        hashPinPolicy('test', 'test', badHash, newPinPolicy);
    }).toThrow();
});

test('No newPinPolicy value provided should error', () => {
    expect(() => {
        hashPinPolicy('test', 'test', goodHash);
    }).toThrow();
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.put.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(hashPinPolicy('test', 'test', goodHash, newPinPolicy)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.put.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(hashPinPolicy('test', 'test', goodHash, newPinPolicy)).rejects.toEqual(Error(`unknown server response while changing pin policy for hash: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.put.mockRejectedValue('test error');
    expect.assertions(1);
    expect(hashPinPolicy('test', 'test', goodHash, newPinPolicy)).rejects.toEqual('test error');
});


