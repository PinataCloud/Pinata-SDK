/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig } from "../types";

export const deleteGroup = async (
  config: PinataConfig | undefined,
  groupId: string,
) => {
  try {
    const request = await fetch(`https://api.pinata.cloud/groups/${groupId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
    });
    const res: string = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
