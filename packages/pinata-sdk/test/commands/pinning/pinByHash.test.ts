import axios from 'axios';
import pinByHash from '../../../src/commands/pinning/pinByHash';

jest.mock('axios');

//common values
const badHashToPin = 'test';
const goodHashToPin = 'Qma6e8dovfLyiG2UUfdkSHNPAySzrWLX9qVXb44v1muqcp';

test('No hashToPin value is provided should error', () => {
    expect(() => {
        pinByHash('test', 'test');
    }).toThrow();
});

test('Invalid HashToPin value is provided', () => {
    expect(() => {
        pinByHash({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, badHashToPin);
    }).toThrow();
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.post as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinByHash({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, goodHashToPin)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    (axios.post as jest.Mock).mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinByHash({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, goodHashToPin)).rejects.toEqual(Error(`unknown server response while adding to pin queue: ${badStatus}`));
});

test('Rejection handled', () => {
    (axios.post as jest.Mock).mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinByHash({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, goodHashToPin)).rejects.toEqual('test error');
});

