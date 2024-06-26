export type PinataConfig = {
  pinataJwt: string;
  pinataGateway?: string;
  pinataGatewayKey?: string;
};

export type PinResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
};

export type PinByCIDResponse = {
  id: string;
  ipfsHash: string;
  status: "prechecking" | "retrieving";
  name: string;
  updated?: boolean;
};

export type FileObject = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

export type PinataMetadata = {
  name?: string;
  keyValues?: Record<string, string | number>;
};

export type PinataMetadataUpdate = {
  cid: string;
  name?: string;
  keyValues?: Record<string, string | number>;
};

export type UploadOptions = {
  metadata?: PinataMetadata;
  pinType?: "async" | "sync" | "cidOnly";
};

export type UploadCIDOptions = {
  metadata?: PinataMetadata;
  peerAddresses?: string[];
};

export type UnpinResponse = {
  hash: string;
  status: string;
};

export type PinListItem = {
  id: string;
  ipfs_pin_hash: string;
  size: number;
  user_id: string;
  date_pinned: string;
  date_unpinned: string | null;
  metadata: {
    name: string;
    keyvalues: string[] | null;
  };
  regions: {
    regionId: string;
    currentReplicationCount: number;
    desiredReplicationCount: number;
  }[];
  mime_type: string;
  number_of_files: number;
};

export type PinListResponse = {
  rows: PinListItem[];
};

export type PinListQuery = {
  cid?: string;
  pinStart?: string;
  pinEnd?: string;
  pinSizeMin?: number;
  pinSizeMax?: number;
  pageLimit?: number;
  pageOffset?: number;
  name?: string;
  key?: string;
  value?: string;
  operator?:
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "ne"
    | "eq"
    | "between"
    | "notBetween"
    | "like"
    | "notLike"
    | "iLike"
    | "notILike"
    | "regexp"
    | "iRegexp";
};

export type GetCIDResponse = {
  data?: string | Blob | null;
  contentType: any;
};
