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
    const folder = "folder";
    const data = new FormData();

    Array.from(files).forEach((file: any) => {
      const name = options?.metadata ? options.metadata.name : file.name;
      data.append("file", file, `${folder}/${name}`);
    });

    data.append(
      "pinataOptions",
      JSON.stringify({
        cidVersion: 1,
      }),
    );

    data.append(
      "pinataMetadata",
      JSON.stringify({
        name: options?.metadata ? options.metadata.name : files[0].name,
        keyvalues: options?.metadata?.keyValues,
      }),
    );

    const request = await fetch(
      `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      {
        method: "POST",
        headers: {
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
