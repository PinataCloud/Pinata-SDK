import { pinJobs } from "../../src/core/data/pinJobs";
import { PinataConfig, PinJobItem } from "../../src";
import { PinJobQuery } from "../../dist";

describe("pinJobs", () => {
  const mockConfig: PinataConfig = {
    pinataJwt: "test-jwt",
  };

  const mockResponse: PinJobItem[] = [
    {
      id: "1",
      ipfs_pin_hash: "Qm...1",
      date_queued: "2023-07-15T00:00:00Z",
      name: "Test Pin Job 1",
      status: "retrieving",
      keyvalues: { key1: "value1" },
      host_nodes: ["node1"],
      pin_policy: {
        regions: [
          {
            id: "R1",
            desiredReplicationCount: 1,
          },
        ],
        version: 1,
      },
    },
  ];

  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch pin jobs with default options", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ rows: mockResponse }),
    } as unknown as Response);

    const result = await pinJobs(mockConfig);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.pinata.cloud/pinning/pinJobs?includesCount=false",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer test-jwt",
        },
      },
    );
    expect(result).toEqual(mockResponse);
  });

  it("should fetch pin jobs with custom options", async () => {
    const customOptions: PinJobQuery = {
      sort: "ASC" as const,
      status: "retrieving",
      ipfs_pin_hash: "Qm...1",
      limit: 5,
      offset: 10,
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ rows: mockResponse }),
    } as unknown as Response);

    const result = await pinJobs(mockConfig, customOptions);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.pinata.cloud/pinning/pinJobs?includesCount=false&ipfs_pin_hash=Qm...1&status=retrieving&sort=ASC&limit=5&offset=10",
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

    await expect(pinJobs(mockConfig)).rejects.toThrow("API error");
  });
});
