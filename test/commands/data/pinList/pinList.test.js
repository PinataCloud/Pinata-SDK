import axios from 'axios';
import pinList from './../../../../src/commands/data/pinList/pinList';

jest.mock('axios');

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.get.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(pinList('test', 'test')).rejects.toEqual(Error(`unknown server response while attempting to retrieve user pin list: ${badStatus}`));
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.get.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(pinList('test', 'test')).resolves.toEqual(goodStatus.data);
});

test('Rejection handled', () => {
    axios.get.mockRejectedValue('test error');
    expect.assertions(1);
    expect(pinList('test', 'test')).rejects.toEqual('test error');
});
