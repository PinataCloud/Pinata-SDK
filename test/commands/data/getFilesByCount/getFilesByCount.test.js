import getFilesByCount from "../../../../src/commands/data/getFilesByCount/getFilesByCount";
import axios from "axios";
import pinListSampleAPI from "./pinlist-sample-api.json";
import { baseUrl } from "../../../../src/constants";

jest.mock("axios");

const metadataName = (item) => {
    return item.metadata.name;
};
const callIterableObject = async (
    pinataKey,
    pinataSecret,
    filterToApply,
    pinsCount
) => {
    const pins = [];
    for await (const item of getFilesByCount(
        pinataKey,
        pinataSecret,
        filterToApply,
        pinsCount,
    )) {
        pins.push(metadataName(item));
    }

    return pins;
};

describe("Get Files By Count", () => {
    const fakeHeaders = {
        headers: {
            pinata_api_key: "anykey",
            pinata_secret_api_key: "anysecret",
        },
        withCredentials: true,
    };
    const statusOk = {
        status: 200,
    };
    const filterToApply = {
        status: "pinned",
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    const pinListAxiosMockPages = {
        firstPage: {
            url: `${baseUrl}/data/pinList?includeCount=false&pageLimit=10&`,
            headers: fakeHeaders,
            response: {
                ...statusOk,
                data: {
                    rows: pinListSampleAPI.rows.slice(0, 10),
                },
            },
        },
        secondPage: {
            url: `${baseUrl}/data/pinList?includeCount=false&pageLimit=10&pageOffset=10&`,
            headers: fakeHeaders,
            response: {
                ...statusOk,
                data: {
                    rows: pinListSampleAPI.rows.slice(10, 20),
                },
            },
        },
        thirdPageEmpty: {
            url: `${baseUrl}/data/pinList?includeCount=false&pageLimit=10&pageOffset=20&`,
            headers: fakeHeaders,
            response: {
                ...statusOk,
                data: {
                    rows: [],
                },
            },
        },
        firstPageEmpty: {
            url: `${baseUrl}/data/pinList?includeCount=false&pageLimit=10&`,
            headers: fakeHeaders,

            response: {
                ...statusOk,
                data: {
                    rows: [],
                },
            },
        },
    };

    test("Request 17 pins, pins available", async () => {
        const pinsToRequest = 17;

        axios.get
            .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
            .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response);

        const pins = await callIterableObject(
            fakeHeaders.headers.pinata_api_key,
            fakeHeaders.headers.pinata_secret_api_key,
            filterToApply,
            pinsToRequest
        );

        expect(pins).toEqual(
            pinListSampleAPI.rows.slice(0, pinsToRequest).map(metadataName)
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

    test("Request 6 pins, pins available", async () => {
        const pinsToRequest = 6;

        axios.get.mockResolvedValueOnce(
            pinListAxiosMockPages.firstPage.response
        );
        const pins = await callIterableObject(
            fakeHeaders.headers.pinata_api_key,
            fakeHeaders.headers.pinata_secret_api_key,
            filterToApply,
            pinsToRequest
        );
        expect(pins).toEqual(
            pinListSampleAPI.rows.slice(0, pinsToRequest).map(metadataName)
        );

        expect(pins).toHaveLength(pinsToRequest);
        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPage.url,
            pinListAxiosMockPages.firstPage.headers
        );
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test("Request 25 pins, pins not available", async () => {
        const pinsToRequest = 25;

        axios.get
            .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
            .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response)
            .mockResolvedValueOnce(
                pinListAxiosMockPages.thirdPageEmpty.response
            );
        const pins = await callIterableObject(
            fakeHeaders.headers.pinata_api_key,
            fakeHeaders.headers.pinata_secret_api_key,
            filterToApply,
            pinsToRequest
        );

        expect(pins).toEqual(
            pinListSampleAPI.rows.slice(0, pinsToRequest).map(metadataName)
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

    test("Request 3 pins, pins not available", async () => {
        const pinsToRequest = 3;

        axios.get.mockResolvedValueOnce(
            pinListAxiosMockPages.firstPageEmpty.response
        );
        const pins = await callIterableObject(
            fakeHeaders.headers.pinata_api_key,
            fakeHeaders.headers.pinata_secret_api_key,
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

    test("Request all pins, pins available", async () => {
        axios.get
        .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
        .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response)
        .mockResolvedValueOnce(
            pinListAxiosMockPages.thirdPageEmpty.response
        );
        const pins = await callIterableObject(
            fakeHeaders.headers.pinata_api_key,
            fakeHeaders.headers.pinata_secret_api_key,
            filterToApply
        );
        expect(pins).toEqual(
            pinListSampleAPI.rows.map(metadataName)
        );

        expect(pins).toHaveLength(pinListSampleAPI.rows.length);
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

    test("Request all pins, pins not available", async () => {
        axios.get.mockResolvedValueOnce(
            pinListAxiosMockPages.firstPageEmpty.response
        );
        const pins = await callIterableObject(
            fakeHeaders.headers.pinata_api_key,
            fakeHeaders.headers.pinata_secret_api_key,
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
