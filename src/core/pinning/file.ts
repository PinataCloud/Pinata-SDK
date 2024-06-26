/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, PinResponse, UploadOptions } from "../types";

export const uploadFile = async (
  config: PinataConfig | undefined,
  file: any,
  options?: UploadOptions,
) => {
  try {
    const data = new FormData();
    data.append("file", file, file.name);

    data.append(
      "pinataOptions",
      JSON.stringify({
        cidVersion: 1,
      }),
    );

    data.append(
      "pinataMetadata",
      JSON.stringify({
        name: options?.metadata ? options.metadata.name : file.name,
        keyvalues: options?.metadata?.keyValues,
      }),
    );

    const request = await fetch(
      `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config?.pinataJwt}`,
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
