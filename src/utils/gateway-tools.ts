import * as isIPFS from "is-ipfs";

function containsCID(url: string) {
  if (typeof url !== "string") {
    throw new Error("url is not string");
  }
  const splitUrl = url.split(/\/|\?/);
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
  const splitUrl = sourceUrl.split(results.cid!);

  if (!sourceUrl.startsWith("https") || !sourceUrl.startsWith("ipfs")) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  //case 1 - the ipfs://cid path
  if (sourceUrl.includes(`ipfs://${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  //case 2 - the /ipfs/cid path (this should cover ipfs://ipfs/cid as well
  if (sourceUrl.includes(`/ipfs/${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipfs/${results.cid}${splitUrl[1]}`;
  }

  //case 3 - the /ipns/cid path
  if (sourceUrl.includes(`/ipns/${results.cid}`)) {
    return `${desiredGatewayPrefix}/ipns/${results.cid}${splitUrl[1]}`;
  }

  //this is the fallback if no supported patterns are provided
  throw new Error(
    "unsupported URL pattern, please submit a github issue with the URL utilized",
  );
}
