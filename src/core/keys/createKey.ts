/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, KeyOptions, KeyResponse } from "../types";

export const createKey = async (
  config: PinataConfig | undefined,
  options: KeyOptions,
) => {
  try {
    const data = JSON.stringify(options);

    const request = await fetch(`https://api.pinata.cloud/v3/pinata/keys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
      body: data,
    });
    const res: KeyResponse = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
