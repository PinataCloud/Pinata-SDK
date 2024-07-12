/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, GroupResponseItem } from "../types";

export const getGroup = async (
  config: PinataConfig | undefined,
  groupId: string,
) => {
  try {
    const request = await fetch(`https://api.pinata.cloud/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
    });
    const res: GroupResponseItem[] = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
