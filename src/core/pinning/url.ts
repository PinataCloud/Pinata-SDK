/**
 * Uploads multiple file types 
 * @returns message
 */

import { PinataConfig, PinResponse, UploadOptions } from "../types";

export const uploadUrl = async (
  config: PinataConfig | undefined,
  url: string,
  options?: UploadOptions
) => {
  try {
    const data = new FormData()
    
    const stream = await fetch(url)

    const arrayBuffer = await stream.arrayBuffer()

    const blob = new Blob([arrayBuffer])

    const name = options?.metadata ? options.metadata.name : `url_upload`

    const file = new File([blob], name!)
    
    data.append("file", file, name)

    data.append("pinataOptions", JSON.stringify({
      cidVersion: 1
    }))

    data.append("pinataMetadata", JSON.stringify({
      name: name,
      keyvalues: options?.metadata?.keyValues
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
