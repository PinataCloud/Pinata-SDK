/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, UnpinResponse } from "../types";

const wait = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const unpinFile = async (
  config: PinataConfig | undefined,
  files: string[],
) => {
  try {
    let responses: UnpinResponse[] = [];
    for (const hash of files) {
      const request = await fetch(
        `https://api.pinata.cloud/pinning/unpin/${hash}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config?.pinata_jwt}`,
          },
        },
      );
      await wait(300);
      if (!request.ok) {
        const res: any = await request.json();
        responses.push({
          hash: hash,
          status: res.error.message,
        });
      } else {
        const res: string = await request.text();
        responses.push({
          hash: hash,
          status: res,
        });
      }
    }
    return responses;
  } catch (error: any) {
    throw error.message;
  }
};
