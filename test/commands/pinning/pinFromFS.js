import axios from 'axios';
import pinFromFS from'../../../src/commands/pinning/pinFromFS';
jest.mock('axios');

//common values
const testSource = './testing/testing'

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.post.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinFromFS('test', 'test', testSource)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.post.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinFromFS('test', 'test', testSource)).rejects.toEqual(Error(`unknown server response while pinning to IPFS: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.post.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinFromFS('test', 'test', testSource)).rejects.toEqual('test error');
});


