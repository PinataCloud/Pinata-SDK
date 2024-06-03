export type PinataConfig = {
  pinata_jwt: string;
  pinata_gateway: string;
};

export type PinResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean; 
}

export type FileObject = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

export type PinataMetadata = {
  name: string;
}


