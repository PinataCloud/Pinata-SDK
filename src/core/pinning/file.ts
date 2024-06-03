/**
 * Uploads multiple file types 
 * @returns message
 */

import { PinataConfig, PinataMetadata, PinResponse } from "../types";

export const uploadFile = async (
  config: PinataConfig | undefined,
  file: any,
  options: PinataMetadata
) => {
  try {
    const data = new FormData()
    data.append("file", file, file.name)

    data.append("pinataOptions", JSON.stringify({
      cidVersion: 1
    }))

    data.append("pinataMetadata", JSON.stringify({
      name: options ? options.name : file.name
    }))

    const request = await fetch(
      `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config?.pinata_jwt}`,
        },
        body: data
      },
    );
    const res: PinResponse = await request.json();
    return res
  } catch (error) {
    throw error;
  }
};
