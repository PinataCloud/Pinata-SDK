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
    const data = JSON.stringify({
      hashToPin: cid,
      pinataMetadata: {
        name: options?.metadata ? options?.metadata?.name : cid,
        keyvalues: options?.metadata?.keyValues,
      },
      pinataOptions: {
        hostNodes: options?.peerAddresses ? options.peerAddresses : "",
      },
    });

    const request = await fetch(`https://api.pinata.cloud/pinning/pinByHash`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
      body: data,
    });
    const res: PinByCIDResponse = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
