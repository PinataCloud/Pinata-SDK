/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, GroupResponseItem, UpdateGroupOptions } from "../types";

export const updateGroup = async (
  config: PinataConfig | undefined,
  options: UpdateGroupOptions,
) => {
  try {
    const data = JSON.stringify({
      name: options.name,
    });

    const request = await fetch(
      `https://api.pinata.cloud/groups/${options.groupId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config?.pinataJwt}`,
        },
        body: data,
      },
    );
    const res: GroupResponseItem = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
