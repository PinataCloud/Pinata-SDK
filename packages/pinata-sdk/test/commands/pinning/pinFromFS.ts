import axios from 'axios';
import pinFromFS, {
    normalizePath
} from '../../../src/commands/pinning/pinFromFS';
jest.mock('axios');

//common values
const testSource = './testing/testing';

test('200 status is returned', () => {
    const goodStatus = {
        status: 200,
        data: 'testData'
    };
    (axios.post as jest.Mock).mockResolvedValue(goodStatus);
    expect.assertions(1);
    expect(
        pinFromFS(
            { pinataApiKey: 'test', pinataSecretApiKey: 'test' },
            testSource
        )
    ).resolves.toEqual(goodStatus.data);
});

test('Result other than 200 status is returned', () => {
    const badStatus = {
        status: 700
    };
    (axios.post as jest.Mock).mockResolvedValue(badStatus);
    expect.assertions(1);
    expect(
        pinFromFS(
            { pinataApiKey: 'test', pinataSecretApiKey: 'test' },
            testSource
        )
    ).rejects.toEqual(
        Error(`unknown server response while pinning to IPFS: ${badStatus}`)
    );
});

test('Rejection handled', () => {
    (axios.post as jest.Mock).mockRejectedValue('test error');
    expect.assertions(1);
    expect(
        pinFromFS(
            { pinataApiKey: 'test', pinataSecretApiKey: 'test' },
            testSource
        )
    ).rejects.toEqual('test error');
});

test('normalize path', () => {
    const useCases = [
        {
            start: '/Users/somebody/Documents//test-folder-issue/screen.png',
            end: 'test-folder-issue/screen.png'
        },

        {
            start: '../test/commands/data/pinlist-sample-api.ts',
            end: 'data/pinlist-sample-api.ts'
        },
        { start: '../test/log.txt', end: 'test/log.txt' },
        { start: './cat.pdf', end: 'cat.pdf' },
        { start: '../cat.pdf', end: 'cat.pdf' }
    ];

    useCases.forEach((p) => {
        expect(normalizePath(p.start)).toEqual(p.end);
    });
});
