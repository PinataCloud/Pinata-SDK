/**
 * Uploads multiple file types
 * @returns message
 */

import {
  PinJobItem,
  PinJobQuery,
  PinJobResponse,
  PinataConfig,
} from "../types";

export const pinJobs = async (
  config: PinataConfig | undefined,
  options?: PinJobQuery,
): Promise<PinJobItem[]> => {
  try {
    const params = new URLSearchParams({
      includesCount: "false",
    });

    if (options) {
      const { ipfs_pin_hash: cid, status, sort, limit, offset } = options;

      if (cid) params.append("ipfs_pin_hash", cid.toString());
      if (status) params.append("status", status.toString());
      if (sort) params.append("sort", sort.toString());
      if (limit) params.append("limit", limit.toString());
      if (offset) params.append("offset", offset.toString());
    }

    const url = `https://api.pinata.cloud/pinning/pinJobs?${params.toString()}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
    });
    const res: PinJobResponse = await request.json();
    return res.rows;
  } catch (error) {
    throw error;
  }
};
