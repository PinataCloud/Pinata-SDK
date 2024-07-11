/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, RevokeKeyResponse } from "../types";

const wait = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const revokeKeys = async (
  config: PinataConfig | undefined,
  keys: string[],
) => {
  try {
    let responses: RevokeKeyResponse[] = [];
    for (const key of keys) {
      const request = await fetch(
        `https://api.pinata.cloud/v3/pinata/keys/${key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config?.pinataJwt}`,
          },
        },
      );
      await wait(300);
      if (!request.ok) {
        const res: any = await request.json();
        responses.push({
          key: key,
          status: res.error.message,
        });
      } else {
        const res: string = await request.json();
        responses.push({
          key: key,
          status: res,
        });
      }
    }
    return responses;
  } catch (error: any) {
    throw error.message;
  }
};
