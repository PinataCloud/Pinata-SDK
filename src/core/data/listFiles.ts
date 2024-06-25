/**
 * Uploads multiple file types
 * @returns message
 */

import {
  PinListItem,
  PinListQuery,
  PinListResponse,
  PinataConfig,
} from "../types";

export const listFiles = async (
  config: PinataConfig | undefined,
  options?: PinListQuery,
): Promise<PinListItem[]> => {
  try {
    const params = new URLSearchParams({
      includesCount: "false",
    });

    if (options) {
      const {
        cid,
        pinStart,
        pinEnd,
        pinSizeMin,
        pinSizeMax,
        pageLimit,
        pageOffset,
        name,
        key,
        value,
        operator,
      } = options;

      if (cid) params.append("cid", cid);
      if (pinStart) params.append("pinStart", pinStart);
      if (pinEnd) params.append("pinEnd", pinEnd);
      if (pinSizeMin) params.append("pinSizeMin", pinSizeMin.toString());
      if (pinSizeMax) params.append("pinSizeMax", pinSizeMax.toString());
      if (pageLimit) params.append("pageLimit", pageLimit.toString());
      if (pageOffset) params.append("pageOffset", pageOffset.toString());
      if (name) params.append("metadata[name]", name);
      if (key && value) {
        const keyValueParam = JSON.stringify({
          [key]: { value, op: operator || "eq" },
        });
        params.append("metadata[keyvalues]", keyValueParam);
      }
    }

    const url = `https://api.pinata.cloud/data/pinList?status=pinned&includesCount=false&${params.toString()}`;

    const request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config?.pinata_jwt}`,
      },
    });
    const res: PinListResponse = await request.json();
    return res.rows;
  } catch (error) {
    throw error;
  }
};
