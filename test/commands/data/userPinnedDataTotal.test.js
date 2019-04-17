import axios from 'axios';
import userPinnedDataTotal from './../../../src/commands/data/userPinnedDataTotal';

jest.mock('axios');

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.get.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(userPinnedDataTotal('test', 'test')).rejects.toEqual(Error(`unknown server response while attempting to retrieve pinned data total: ${badStatus}`));
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.get.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(userPinnedDataTotal('test', 'test')).resolves.toEqual(goodStatus.data);
});

test('Rejection handled', () => {
    axios.get.mockRejectedValue('test error');
    expect.assertions(1);
    expect(userPinnedDataTotal('test', 'test')).rejects.toEqual('test error');
});
