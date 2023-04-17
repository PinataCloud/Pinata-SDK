import { createHTTPService } from "./RequestHandler";

export async function prepareTwitter(apiURL: string) {
  const submarineClientAPI = createHTTPService(apiURL);
  const resp = await submarineClientAPI.get("api/v1/prepare/twitter");

  return resp;
}

export async function dryRun(apiURL, shortId, unlockPayload) {
  const submarineClientAPI = createHTTPService(apiURL);

  const resp = await submarineClientAPI.post("/api/v1/dryrun", {
    shortId,
    unlockPayload,
  });

  return resp;
}
export async function verifyLocation(
  apiURL: string,
  latitude: number,
  longitude: number,
  shortId: string
) {
  const submarineClientAPI = createHTTPService(apiURL);
  const resp = await submarineClientAPI.post("api/v1/dryrun", {
    shortId: shortId,
    unlockPayload: {
      type: "location",
      userLat: latitude,
      userLong: longitude,
    },
  });
  return resp;
}

export async function getContent(apiURL: string, query: { shortId?: string }) {
  const submarineClientAPI = createHTTPService(apiURL);

  if (query.shortId) {
    const resp = await submarineClientAPI.get(`api/content/${query.shortId}`);

    return resp;
  }

  throw new Error("provide a short id");
}

export async function verifyContract(
  apiURL,
  contract: string,
  shortId: string
) {
  const submarineClientAPI = createHTTPService(apiURL);
  const resp = await submarineClientAPI.get("api/verify", {
    params: {
      contract,
      shortId,
    },
  });

  return resp;
}

export async function verifyWallet(apiURL: string, data) {
  const submarineClientAPI = createHTTPService(apiURL);
  const resp = await submarineClientAPI.post("api/verify", {
    data,
  });

  return resp;
}
