/**
 * Description
 * @returns
 */

import { GetCIDResponse, PinataConfig } from "../types";

export const getCid = async (
  config: PinataConfig | undefined,
  cid: string,
): Promise<any> => {
  try {
    let match: any;
    let data: any;
    let contentType: string | null;
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
    contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (contentType?.includes("text/")) {
      data = await request.text();
    } else {
      data = await request.blob();
    }

    const res: GetCIDResponse = {
      data: data,
      contentType: contentType,
    };

    return res;
  } catch (error) {
    throw error;
  }
};
