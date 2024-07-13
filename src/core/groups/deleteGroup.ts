/**
 * Uploads multiple file types
 * @returns message
 */

import { GetGroupOptions, PinataConfig } from "../types";

export const deleteGroup = async (
  config: PinataConfig | undefined,
  options: GetGroupOptions,
) => {
  try {
    const request = await fetch(
      `https://api.pinata.cloud/groups/${options.groupId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config?.pinataJwt}`,
        },
      },
    );
    const res: string = await request.text();
    return res;
  } catch (error) {
    throw error;
  }
};
