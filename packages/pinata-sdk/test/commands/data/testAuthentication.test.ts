import axios from 'axios';
import testAuthentication from '../../../src/commands/data/testAuthentication';

jest.mock('axios');

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    (axios.get as jest.Mock).mockResolvedValue(badStatus);
    expect.assertions(1);
    return expect(testAuthentication({ pinataApiKey: 'test', pinataSecretApiKey: 'test' })).rejects.toEqual(
        Error(`unknown server response while authenticating: ${badStatus}`)
    );
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200
    };
    (axios.get as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    return expect(testAuthentication({ pinataApiKey: 'test', pinataSecretApiKey: 'test' })).resolves.toEqual({
        authenticated: true
    });
});

test('Rejection handled', () => {
    (axios.get as jest.Mock).mockRejectedValue('test error');
    expect.assertions(1);
    return expect(testAuthentication({ pinataApiKey: 'test', pinataSecretApiKey: 'test' })).rejects.toEqual(
        'test error'
    );
});
