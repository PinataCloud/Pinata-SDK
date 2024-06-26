import * as isIPFS from "is-ipfs";

function containsCID(url: string) {
  if (typeof url !== "string") {
    throw new Error("url is not string");
  }
  const splitUrl = url.split(/\/|\?/);

  // Check for CID in subdomain
  const urlObj = new URL(url);
  const subdomains = urlObj.hostname.split(".");
  for (const subdomain of subdomains) {
    if (isIPFS.cid(subdomain)) {
      return {
        containsCid: true,
        cid: subdomain,
      };
    }
  }

  // Check for CID in path
  for (const split of splitUrl) {
    if (isIPFS.cid(split)) {
      return {
        containsCid: true,
        cid: split,
      };
    }
    const splitOnDot = split.split(".")[0];
    if (isIPFS.cid(splitOnDot)) {
      return {
        containsCid: true,
        cid: splitOnDot,
      };
    }
  }

  return {
    containsCid: false,
    cid: null,
  };
}

export function convertToDesiredGateway(
  sourceUrl: string,
  desiredGatewayPrefix: string | undefined,
) {
  const results = containsCID(sourceUrl);

  if (results.containsCid !== true) {
    throw new Error("url does not contain CID");
  }

  const urlObj = new URL(sourceUrl);
  const path = urlObj.pathname + urlObj.search + urlObj.hash;

  //case 1 - the ipfs://cid path
  if (sourceUrl.startsWith(`ipfs://${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${path}`;
  }

  //case 2 - the /ipfs/cid path (this should cover ipfs://ipfs/cid as well)
  if (sourceUrl.includes(`/ipfs/${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${path}`;
  }

  //case 3 - the /ipns/cid path
  if (sourceUrl.includes(`/ipns/${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipns/${results.cid}${path}`;
  }

  //case 4 - the CID is in the subdomain
  if (urlObj.hostname.includes(results.cid)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${path}`;
  }

  //this is the fallback if no supported patterns are provided
  throw new Error(
    "unsupported URL pattern, please submit a github issue with the URL utilized",
  );
}
