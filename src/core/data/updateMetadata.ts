/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, PinataMetadataUpdate } from "../types";

export const updateMetadata = async (
  config: PinataConfig | undefined,
  options: PinataMetadataUpdate,
): Promise<string> => {
  try {
    const data = {
      ipfsPinHash: options.cid,
      name: options.name,
      keyvalues: options.keyValues,
    };
    const request = await fetch(
      `https://api.pinata.cloud/pinning/hashMetadata`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config?.pinataJwt}`,
        },
        body: JSON.stringify(data),
      },
    );
    const res: string = await request.text();
    return res;
  } catch (error) {
    throw error;
  }
};
