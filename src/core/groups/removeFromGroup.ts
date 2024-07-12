/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, GroupCIDOptions } from "../types";

export const removeFromGroup = async (
  config: PinataConfig | undefined,
  groupId: string,
  options: GroupCIDOptions,
) => {
  try {
    const data = JSON.stringify(options);

    const request = await fetch(
      `https://api.pinata.cloud/groups/${groupId}/cids`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config?.pinataJwt}`,
        },
        body: data,
      },
    );
    const res: string = await request.json();
    return res;
  } catch (error) {
    throw error;
  }
};
