import axios from 'axios';
import pinFileToIPFS from'../../../src/commands/pinning/pinFileToIPFS';
import fs from 'fs';
jest.mock('axios');

//common values
const nonStream = 'test';
const validStream = fs.createReadStream('./pinata.png');


test('non-readableStream is passed in', () => {
    expect(pinFileToIPFS('test', 'test', nonStream)).rejects.toEqual({
        error: 'readStream is not a readable stream'
    });

    return undefined;
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200
    };
    axios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinFileToIPFS('test', 'test', validStream)).resolves.toEqual(goodStatus);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.post.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinFileToIPFS('test', 'test', validStream)).rejects.toEqual({
        error: `unknown server response while pinning File to IPFS: ${badStatus}`
    });
});

test('Rejection handled', () => {
    axios.post.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinFileToIPFS('test', 'test', validStream)).rejects.toEqual({
        error: 'test error'
    });
});


