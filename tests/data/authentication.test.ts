import { testAuthentication } from "../../src/core/authentication/testAuthentication";
import { PinataConfig } from "../../src";

describe("testAuthentication function", () => {
  let originalFetch: typeof fetch;
  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should test authenticaiton", async () => {
    const mockConfig: PinataConfig = {
      pinataJwt: "test_jwt",
      pinataGateway: "test.cloud",
    };
    const mockResponse = {
      message: "Congratulations! You are communicating with the Pinata API!",
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await testAuthentication(mockConfig);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.pinata.cloud/data/testAuthentication",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mockConfig.pinataJwt}`,
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });
});
