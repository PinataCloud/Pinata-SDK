/**
 * Uploads multiple file types
 * @returns message
 */

import { GroupCIDOptions, PinataConfig } from "../types";

export const addToGroup = async (
  config: PinataConfig | undefined,
  options: GroupCIDOptions,
) => {
  try {
    const data = JSON.stringify({
      cids: options.cids,
    });

    const request = await fetch(
      `https://api.pinata.cloud/groups/${options.groupId}/cids`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config?.pinataJwt}`,
        },
        body: data,
      },
    );
    const res: string = await request.text();
    return res;
  } catch (error) {
    throw error;
  }
};
