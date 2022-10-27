import getFilesByCount from '../../../../src/commands/data/getFilesByCount/getFilesByCount';
import axios from 'axios';
import {
    APIData,
    pinListAxiosMockPages,
    fakeHeaders
} from '../pinlist-sample-api';
import { PinataConfig, PinataPin, PinataPinListFilterOptions } from '../../../../src';

jest.mock('axios');

const metadataName = (item) => {
    return item.metadata.name;
};
const callIterableObject = async (config: PinataConfig, filterToApply: PinataPinListFilterOptions, pinsCount?: number) => {
    const pins: PinataPin[] = [];
    for await (const item of getFilesByCount(
        config,
        filterToApply,
        pinsCount
    )) {
        pins.push(metadataName(item));
    }

    return pins;
};

describe('Get Files By Count', () => {
    const pinataConfig = {
        pinataApiKey: fakeHeaders.headers.pinata_api_key,
        pinataSecretApiKey: fakeHeaders.headers.pinata_secret_api_key
    };
    const filterToApply = {
        status: 'pinned'
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Request 17 pins, pins available', async () => {
        const pinsToRequest = 17;

        (axios.get as jest.Mock)
            .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
            .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response);

        const pins = await callIterableObject(
            pinataConfig,
            filterToApply,
            pinsToRequest
        );

        expect(pins).toEqual(
            APIData.rows.slice(0, pinsToRequest).map(metadataName)
        );
        expect(pins).toHaveLength(pinsToRequest);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPage.url,
            pinListAxiosMockPages.firstPage.headers
        );
        expect(axios.get).toHaveBeenNthCalledWith(
            2,
            pinListAxiosMockPages.secondPage.url,
            pinListAxiosMockPages.secondPage.headers
        );

        expect(axios.get).toHaveBeenCalledTimes(2);
    });

    test('Request 6 pins, pins available', async () => {
        const pinsToRequest = 6;

        (axios.get as jest.Mock).mockResolvedValueOnce(
            pinListAxiosMockPages.firstPage.response
        );
        const pins = await callIterableObject(
            pinataConfig,
            filterToApply,
            pinsToRequest
        );
        expect(pins).toEqual(
            APIData.rows.slice(0, pinsToRequest).map(metadataName)
        );

        expect(pins).toHaveLength(pinsToRequest);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPage.url,
            pinListAxiosMockPages.firstPage.headers
        );
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test('Request 25 pins, pins not available', async () => {
        const pinsToRequest = 25;

        (axios.get as jest.Mock)
            .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
            .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response)
            .mockResolvedValueOnce(
                pinListAxiosMockPages.thirdPageEmpty.response
            );
        const pins = await callIterableObject(
            pinataConfig,
            filterToApply,
            pinsToRequest
        );

        expect(pins).toEqual(
            APIData.rows.slice(0, pinsToRequest).map(metadataName)
        );

        expect(pins).toHaveLength(20);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPage.url,
            pinListAxiosMockPages.firstPage.headers
        );
        expect(axios.get).toHaveBeenNthCalledWith(
            2,
            pinListAxiosMockPages.secondPage.url,
            pinListAxiosMockPages.secondPage.headers
        );
        expect(axios.get).toHaveBeenNthCalledWith(
            3,
            pinListAxiosMockPages.thirdPageEmpty.url,
            pinListAxiosMockPages.thirdPageEmpty.headers
        );

        expect(axios.get).toHaveBeenCalledTimes(3);
    });

    test('Request 3 pins, pins not available', async () => {
        const pinsToRequest = 3;

        (axios.get as jest.Mock).mockResolvedValueOnce(
            pinListAxiosMockPages.firstPageEmpty.response
        );
        const pins = await callIterableObject(
            pinataConfig,
            filterToApply,
            pinsToRequest
        );

        expect(pins).toEqual([]);

        expect(pins).toHaveLength(0);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPageEmpty.url,
            pinListAxiosMockPages.firstPageEmpty.headers
        );

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test('Request all pins, pins available', async () => {
        (axios.get as jest.Mock)
            .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
            .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response)
            .mockResolvedValueOnce(
                pinListAxiosMockPages.thirdPageEmpty.response
            );
        const pins = await callIterableObject(
            pinataConfig,
            filterToApply
        );
        expect(pins).toEqual(APIData.rows.map(metadataName));

        expect(pins).toHaveLength(APIData.rows.length);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPage.url,
            pinListAxiosMockPages.firstPage.headers
        );
        expect(axios.get).toHaveBeenNthCalledWith(
            2,
            pinListAxiosMockPages.secondPage.url,
            pinListAxiosMockPages.secondPage.headers
        );
        expect(axios.get).toHaveBeenNthCalledWith(
            3,
            pinListAxiosMockPages.thirdPageEmpty.url,
            pinListAxiosMockPages.thirdPageEmpty.headers
        );

        expect(axios.get).toHaveBeenCalledTimes(3);
    });

    test('Request all pins, pins not available', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce(
            pinListAxiosMockPages.firstPageEmpty.response
        );
        const pins = await callIterableObject(
            pinataConfig,
            filterToApply
        );

        expect(pins).toEqual([]);

        expect(pins).toHaveLength(0);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPageEmpty.url,
            pinListAxiosMockPages.firstPageEmpty.headers
        );

        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
