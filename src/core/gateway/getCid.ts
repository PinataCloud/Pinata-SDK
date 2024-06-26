/**
 * Description
 * @returns
 */

import { convertToDesiredGateway } from "../../utils/gateway-tools";
import { GetCIDResponse, PinataConfig } from "../types";

export const getCid = async (
  config: PinataConfig | undefined,
  cid: string,
): Promise<any> => {
  try {
    let data: any;
    let contentType: string | null;
    const newUrl = convertToDesiredGateway(cid, config?.pinataGateway);

    const request = await fetch(newUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config?.pinataJwt}`,
      },
    });
    contentType = request.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await request.json();
    } else if (contentType?.includes("text/")) {
      data = await request.text();
    } else {
      data = await request.blob();
    }

    const res: GetCIDResponse = {
      data: data,
      contentType: contentType,
    };

    return res;
  } catch (error) {
    throw error;
  }
};
