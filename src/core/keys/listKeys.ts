/**
 * Uploads multiple file types
 * @returns message
 */

import {
  KeyListItem,
  KeyListQuery,
  KeyListResponse,
  PinataConfig,
} from "../types";

export const listKeys = async (
  config: PinataConfig | undefined,
  options?: KeyListQuery,
): Promise<KeyListItem[]> => {
  try {
    const params = new URLSearchParams();

    if (options) {
      const { offset, name, revoked, limitedUse, exhausted } = options;

      if (offset) params.append("offset", offset.toString());
      if (revoked !== undefined) params.append("revoked", revoked.toString());
      if (limitedUse !== undefined)
        params.append("limitedUse", limitedUse.toString());
      if (exhausted !== undefined)
        params.append("exhausted", exhausted.toString());
      if (name) params.append("name", name);
    }

    const url = `https://api.pinata.cloud/v3/pinata/keys?${params.toString()}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
    });
    const res: KeyListResponse = await request.json();
    return res.keys;
  } catch (error) {
    throw error;
  }
};
