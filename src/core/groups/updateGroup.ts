/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, GroupOptions, GroupResponseItem } from "../types";

export const updateGroup = async (
  config: PinataConfig | undefined,
  groupId: string,
  options: GroupOptions,
) => {
  try {
    const data = JSON.stringify(options);

    const request = await fetch(`https://api.pinata.cloud/groups/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
      body: data,
    });
    const res: GroupResponseItem = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
