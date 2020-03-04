import axios from 'axios';
import userPinPolicy from'../../../src/commands/pinning/userPinPolicy';

jest.mock('axios');

//common values
const newPinPolicy = {
    regions: [
        {
            id: 'FRA1',
            desiredReplicationCount: 2
        },
        {
            id: 'NYC1',
            desiredReplicationCount: 2
        }
    ]
};

test('No newPinPolicy value provided should error', () => {
    expect(() => {
        userPinPolicy('test', 'test');
    }).toThrow();
});

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    axios.put.mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(userPinPolicy('test', 'test', newPinPolicy)).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    axios.put.mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(userPinPolicy('test', 'test', newPinPolicy)).rejects.toEqual(Error(`unknown server response while changing pin policy for user: ${badStatus}`));
});

test('Rejection handled', () => {
    axios.put.mockRejectedValue('test error');
    expect.assertions(1);
    expect(userPinPolicy('test', 'test', newPinPolicy)).rejects.toEqual('test error');
});


