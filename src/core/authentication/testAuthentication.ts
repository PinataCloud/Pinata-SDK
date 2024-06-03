/**
 * Tests the current PinataConfig to ensure the used API key is authenticated
 * @returns message
 */

import { PinataConfig } from "../types";

export const testAuthentication = async (
  config: PinataConfig | undefined,
) => {
  try {
    const request = await fetch(
      `https://api.pinata.cloud/data/testAuthentication`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${config?.pinata_jwt}`,
        }
      },
    );
    const res = await request.json();
    return res
  } catch (error) {
    throw error;
  }
};
