/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, PinResponse, UploadOptions } from "../types";

export const uploadFileArray = async (
  config: PinataConfig | undefined,
  files: any,
  options?: UploadOptions,
) => {
  try {
    let jwt;
    if (options && options.keys) {
      jwt = options.keys;
    } else {
      jwt = config?.pinataJwt;
    }

    const folder = options?.metadata?.name
      ? options?.metadata?.name
      : "folder_from_sdk";
    const data = new FormData();

    Array.from(files).forEach((file: any) => {
      data.append("file", file, `${folder}/${file.name}`);
    });

    data.append(
      "pinataMetadata",
      JSON.stringify({
        name: folder,
        keyvalues: options?.metadata?.keyValues,
      }),
    );

    data.append(
      "pinataOptions",
      JSON.stringify({ cidVersion: options?.cidVersion }),
    );

    const request = await fetch(
      `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
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
