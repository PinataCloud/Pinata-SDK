/**
 * Description
 * @returns
 */

import { PinataConfig } from "../types";

export const convertIPFSUrl = (
  config: PinataConfig | undefined,
  url: string,
): string => {
  try {
    const cidRegex = /(Qm[1-9A-HJ-NP-Za-km-z]{44,}|bafy[A-Za-z2-7]{55,})/;
    const match = url.match(cidRegex);
    if (match) {
      return `${config?.pinata_gateway}/ipfs/${match[0]}`;
    } else {
      return url;
    }
  } catch (error) {
    throw error;
  }
};
