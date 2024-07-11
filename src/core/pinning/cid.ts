/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, PinByCIDResponse, UploadCIDOptions } from "../types";

export const uploadCid = async (
  config: PinataConfig | undefined,
  cid: string,
  options?: UploadCIDOptions,
) => {
  try {
    let jwt;
    if (options && options.keys) {
      jwt = options.keys;
    } else {
      jwt = config?.pinataJwt;
    }

    const data = JSON.stringify({
      hashToPin: cid,
      pinataMetadata: {
        name: options?.metadata ? options?.metadata?.name : cid,
        keyvalues: options?.metadata?.keyValues,
      },
      pinataOptions: {
        hostNodes: options?.peerAddresses ? options.peerAddresses : "",
        groupId: options?.groupId,
      },
    });

    const request = await fetch(`https://api.pinata.cloud/pinning/pinByHash`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: data,
    });
    const res: PinByCIDResponse = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
