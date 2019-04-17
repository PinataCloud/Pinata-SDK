import axios from 'axios';
import pinJSONToIPFS from'../../../src/commands/pinning/pinJSONToIPFS';

jest.mock('axios');

//common values
const badJSON = 'test';
const goodJSON = {
    test: 'test'
};

test('non-object is passed in', () => {
    expect(() => {
        pinJSONToIPFS('test', 'test', badJSON);
    }).toThrow('body must be a valid JSON object');
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinJSONToIPFS('test', 'test', goodJSON)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.post.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinJSONToIPFS('test', 'test', goodJSON)).rejects.toEqual(Error(`unknown server response while pinning JSON to IPFS: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.post.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinJSONToIPFS('test', 'test', goodJSON)).rejects.toEqual('test error');
});


