/**
 * Description
 * @returns
 */

import { PinataConfig } from "../types";

export const getCid = async (
  config: PinataConfig | undefined,
  cid: string,
): Promise<any> => {
  try {
    let match: any;
    const cidRegex = /(Qm[1-9A-HJ-NP-Za-km-z]{44,}|bafy[A-Za-z2-7]{55,})/;
    match = cid.match(cidRegex);
    if (match) {
      cid = match[0];
    } else {
      return cid;
    }

    const request = await fetch(`${config?.pinata_gateway}/ipfs/${cid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config?.pinata_jwt}`,
      },
    });
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return await request.json();
    } else if (contentType?.includes("text/")) {
      return await request.text();
    } else if (
      contentType?.includes("image/") ||
      contentType?.includes("video/") ||
      contentType?.includes("audio/")
    ) {
      return await request.blob();
    } else {
      // For other types, return as ArrayBuffer
      return await request.arrayBuffer();
    }
  } catch (error) {
    throw error;
  }
};
