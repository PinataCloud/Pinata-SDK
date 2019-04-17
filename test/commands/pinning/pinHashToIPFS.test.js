import axios from 'axios';
import pinHashToIPFS from'../../../src/commands/pinning/pinHashToIPFS';

jest.mock('axios');

//common values
const badHashToPin = 'test';
const goodHashToPin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

test('No hashToPin value is provided should error', () => {
    expect(() => {
        pinHashToIPFS('test', 'test');
    }).toThrow();
});

test('Invalid HashToPin value is provided', () => {
    expect(() => {
        pinHashToIPFS('test', 'test', badHashToPin);
    }).toThrow();
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinHashToIPFS('test', 'test', goodHashToPin)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.post.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinHashToIPFS('test', 'test', goodHashToPin)).rejects.toEqual(Error(`unknown server response while pinning hash to IPFS: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.post.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinHashToIPFS('test', 'test', goodHashToPin)).rejects.toEqual('test error');
});


