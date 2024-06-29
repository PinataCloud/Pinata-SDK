/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, UserPinnedDataResponse } from "../types";

export const totalStorageUsage = async (
  config: PinataConfig | undefined,
): Promise<number> => {
  try {
    const url = `https://api.pinata.cloud/data/userPinnedDataTotal`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
    });
    const res: UserPinnedDataResponse = await request.json();
    return res.pin_size_total;
  } catch (error) {
    throw error;
  }
};
