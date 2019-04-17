import axios from 'axios';
import removePinFromIPFS from'../../../src/commands/pinning/removePinFromIPFS';

jest.mock('axios');

//common values
const badHashToRemove = 'test';
const goodHashToRemove = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

test('No hashToRemove value is provided should error', () => {
    expect(() => {
        removePinFromIPFS('test', 'test');
    }).toThrow('ipfsPinHash value is required for removing a pin from Pinata');
});

test('Invalid hashToRemove value is provided', () => {
    expect(() => {
        removePinFromIPFS('test', 'test', badHashToRemove);
    }).toThrow(`${badHashToRemove} is an invalid IPFS CID`);
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(removePinFromIPFS('test', 'test', goodHashToRemove)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.post.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(removePinFromIPFS('test', 'test', goodHashToRemove)).rejects.toEqual(Error(`unknown server response while removing pin from IPFS: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.post.mockRejectedValue('test error');
    expect.assertions(1);
    expect(removePinFromIPFS('test', 'test', goodHashToRemove)).rejects.toEqual('test error');
});


