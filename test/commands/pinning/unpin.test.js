import axios from 'axios';
import unpin from'../../../src/commands/pinning/unpin';

jest.mock('axios');

//common values
const badHashToUnpin = 'test';
const goodHashToUnpin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

test('No hashToUnpin value is provided should error', () => {
    expect(() => {
        unpin('test', 'test');
    }).toThrow('hashToUnpin value is required for removing a pin from Pinata');
});

test('Invalid hashToUnpin value is provided', () => {
    expect(() => {
        unpin('test', 'test', badHashToUnpin);
    }).toThrow(`${badHashToUnpin} is an invalid IPFS CID`);
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.delete.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(unpin('test', 'test', goodHashToUnpin)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.delete.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(unpin('test', 'test', goodHashToUnpin)).rejects.toEqual(Error(`unknown server response while removing pin from IPFS: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.delete.mockRejectedValue('test error');
    expect.assertions(1);
    expect(unpin('test', 'test', goodHashToUnpin)).rejects.toEqual('test error');
});


