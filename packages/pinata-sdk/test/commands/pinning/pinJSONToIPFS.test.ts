import axios from 'axios';
import pinJSONToIPFS from '../../../src/commands/pinning/pinJSONToIPFS';

jest.mock('axios');

//common values
const badJSON = 'test';
const goodJSON = {
    test: 'test'
};

test('non-object is passed in', () => {
    expect(() => {
        pinJSONToIPFS({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, badJSON);
    }).toThrow('body must be a valid JSON object');
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.post as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinJSONToIPFS({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, goodJSON)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    (axios.post as jest.Mock).mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinJSONToIPFS({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, goodJSON)).rejects.toEqual(Error(`unknown server response while pinning JSON to IPFS: ${badStatus}`));
});

test('Rejection handled', () => {
    (axios.post as jest.Mock).mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinJSONToIPFS({ pinataApiKey: 'test', pinataSecretApiKey: 'test' }, goodJSON)).rejects.toEqual('test error');
});

