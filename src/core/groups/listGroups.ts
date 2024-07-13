/**
 * Uploads multiple file types
 * @returns message
 */

import { PinataConfig, GroupResponseItem, GroupQueryOptions } from "../types";

export const listGroups = async (
  config: PinataConfig | undefined,
  options?: GroupQueryOptions,
) => {
  try {
    const params = new URLSearchParams();

    if (options) {
      const { offset, nameContains, limit } = options;

      if (offset) params.append("offset", offset.toString());
      if (nameContains !== undefined)
        params.append("nameContains", nameContains.toString());
      if (limit !== undefined) params.append("limit", limit.toString());
    }

    const url = `https://api.pinata.cloud/groups?${params.toString()}`;

    const request = await fetch(url, {
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
