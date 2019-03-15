import axios from 'axios';
import addHashToPinQueue from'../../../src/commands/pinning/addHashToPinQueue';

jest.mock('axios');

//common values
const badHashToPin = 'test';
const goodHashToPin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

test('No hashToPin value is provided should error', () => {
    expect(() => {
        addHashToPinQueue('test', 'test');
    }).toThrow();
});

test('Invalid HashToPin value is provided', () => {
    expect(() => {
        addHashToPinQueue('test', 'test', badHashToPin);
    }).toThrow();
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200
    };
    axios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    return expect(addHashToPinQueue('test', 'test', goodHashToPin)).resolves.toEqual(goodStatus);
});

test('Rejection handled', () => {
    axios.post.mockRejectedValue('test error');
    expect.assertions(1);
    return expect(addHashToPinQueue('test', 'test', goodHashToPin)).rejects.toEqual({
        error: 'test error'
    });
});


