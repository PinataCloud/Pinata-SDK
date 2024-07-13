/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, GroupResponseItem, GetGroupOptions } from "../types";

export const getGroup = async (
  config: PinataConfig | undefined,
  options: GetGroupOptions,
) => {
  try {
    const request = await fetch(
      `https://api.pinata.cloud/groups/${options.groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config?.pinataJwt}`,
        },
      },
    );
    const res: GroupResponseItem = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
