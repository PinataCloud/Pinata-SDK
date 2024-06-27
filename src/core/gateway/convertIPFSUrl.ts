/**
 * Description
 * @returns
 */

import { convertToDesiredGateway } from "../../utils/gateway-tools";
import { PinataConfig } from "../types";

export const convertIPFSUrl = (
  config: PinataConfig | undefined,
  url: string,
): string => {
  try {
    let newUrl: string;
    newUrl = convertToDesiredGateway(url, config?.pinataGateway);
    if (config?.pinataGatewayKey) {
      newUrl + `?pinataGatewayToken=${config?.pinataGatewayKey}`;
    }
    return newUrl;
  } catch (error) {
    throw error;
  }
};
