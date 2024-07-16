import { listFiles } from "../../src/core/data/listFiles";
import { PinataConfig, PinListItem } from "../../src";

describe("listFiles", () => {
  const mockConfig: PinataConfig = {
    pinataJwt: "test-jwt",
  };

  const mockResponse: PinListItem[] = [
    {
      id: "1",
      ipfs_pin_hash: "Qm...1",
      size: 1000,
      user_id: "user1",
      date_pinned: "2023-07-15T00:00:00Z",
      date_unpinned: null,
      metadata: {
        name: "Test File 1",
        keyvalues: { key1: "value1" },
      },
      regions: [
        {
          regionId: "R1",
          currentReplicationCount: 1,
          desiredReplicationCount: 1,
        },
      ],
      mime_type: "text/plain",
      number_of_files: 1,
    },
  ];

  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch files with default options", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ rows: mockResponse }),
    } as unknown as Response);

    const result = await listFiles(mockConfig);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.pinata.cloud/data/pinList?status=pinned&includesCount=false",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer test-jwt",
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should fetch files with custom options", async () => {
    const customOptions = {
      pageLimit: 5,
      pageOffset: 10,
      cid: "Qm...1",
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ rows: mockResponse }),
    } as unknown as Response);

    const result = await listFiles(mockConfig, customOptions);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.pinata.cloud/data/pinList?status=pinned&includesCount=false&cid=Qm...1&pageLimit=5&pageOffset=10",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer test-jwt",
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should handle errors", async () => {
    const error = new Error("API error");
    global.fetch = jest.fn().mockRejectedValue(error);

    await expect(listFiles(mockConfig)).rejects.toThrow("API error");
  });
});
