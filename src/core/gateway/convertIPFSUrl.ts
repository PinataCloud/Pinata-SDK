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
    const newUrl = convertToDesiredGateway(url, config?.pinata_gateway);
    return newUrl;
  } catch (error) {
    throw error;
  }
};
