import axios from "axios";
import pinList from "./../../../../src/commands/data/pinList/pinList";
import {
    APIData,
    pinListAxiosMockPages,
    fakeHeaders,
} from "../pinlist-sample-api";

jest.mock("axios");

describe("Get Files By Count", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test("Call two pages in a row", async () => {
        axios.get
            .mockResolvedValueOnce(pinListAxiosMockPages.firstPage.response)
            .mockResolvedValueOnce(pinListAxiosMockPages.secondPage.response);

        const resp = await pinList(
            {
                pinataApiKey: fakeHeaders.headers.pinata_api_key,
                pinataSecretApiKey: fakeHeaders.headers.pinata_secret_api_key,
            },
            { pageLimit: 10, pageOffset: 0 }
        );
        const resp2 = await pinList(
            {
                pinataApiKey: fakeHeaders.headers.pinata_api_key,
                pinataSecretApiKey: fakeHeaders.headers.pinata_secret_api_key,
            },
            { pageLimit: 10, pageOffset: 10 }
        );
        expect(resp).toEqual(pinListAxiosMockPages.firstPage.response.data);
        expect(resp2).toEqual(pinListAxiosMockPages.secondPage.response.data);

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

    test("Call empty page", async () => {
        axios.get.mockResolvedValueOnce(
            pinListAxiosMockPages.firstPageEmpty.response
        );

        const resp = await pinList(
            {
                pinataApiKey: fakeHeaders.headers.pinata_api_key,
                pinataSecretApiKey: fakeHeaders.headers.pinata_secret_api_key,
            },
            { pageLimit: 10, pageOffset: 0 }
        );

        expect(resp).toEqual({ rows: [] });

        expect(axios.get).toHaveBeenNthCalledWith(
            1,
            pinListAxiosMockPages.firstPageEmpty.url,
            pinListAxiosMockPages.firstPageEmpty.headers
        );

        expect(axios.get).toHaveBeenCalledTimes(1);
    });
    test("Result other than 200 status is returned", () => {
        const badStatus = {
            status: 700,
        };
        axios.get.mockResolvedValue(badStatus);
        expect.assertions(1);
        expect(pinList({ pinataApiKey: 'test', pinataSecretApiKey: 'test' })).rejects.toEqual(
            Error(
                `unknown server response while attempting to retrieve user pin list: ${badStatus}`
            )
        );
    });

    test("200 status is returned", () => {
        const goodStatus = {
            status: 200,
            data: "testData",
        };
        axios.get.mockResolvedValue(goodStatus);
        expect.assertions(1);
        expect(pinList({ pinataApiKey: 'test', pinataSecretApiKey: 'test' })).resolves.toEqual(goodStatus.data);
    });

    test("Rejection handled", () => {
        axios.get.mockRejectedValue("test error");
        expect.assertions(1);
        expect(pinList({ pinataApiKey: 'test', pinataSecretApiKey: 'test' })).rejects.toEqual("test error");
    });
});
