/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, PinResponse } from "../types";

export const uploadFileArray = async (
  config: PinataConfig | undefined,
  files: any,
) => {
  try {
    const folder = "folder";
    const data = new FormData();

    Array.from(files).forEach((file: any) => {
      data.append("file", file, `${folder}/${file.name}`);
    });

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
