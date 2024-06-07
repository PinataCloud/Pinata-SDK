/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, PinResponse, UploadOptions } from "../types";

export const uploadJson = async (
  config: PinataConfig | undefined,
  jsonData: any,
  options?: UploadOptions,
) => {
  try {

    const data = JSON.stringify({
      pinataContent: jsonData,
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: options?.metadata ? options.metadata.name : "json",
        keyvalues: options?.metadata?.keyValues,
      },
    });

    const request = await fetch(
      `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config?.pinata_jwt}`,
        },
        body: data,
      },
    );
    const res: PinResponse = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
