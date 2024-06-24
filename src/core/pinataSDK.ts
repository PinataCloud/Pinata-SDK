import {
  FileObject,
  PinByCIDResponse,
  PinListItem,
  PinListQuery,
  PinResponse,
  PinataConfig,
  PinataMetadata,
  UploadCIDOptions,
  UploadOptions,
} from "./types";
import { testAuthentication } from "./authentication/testAuthentication";
import { uploadFile } from "./pinning/file";
import { uploadFileArray } from "./pinning/fileArray";
import { uploadBase64 } from "./pinning/base64";
import { uploadUrl } from "./pinning/url";
import { uploadJson } from "./pinning/json";
import { uploadCid } from "./pinning/cid";
import { unpinFile } from "./pinning/unpin";
import { listFiles } from "./data/listFiles";

const formatConfig = (config: PinataConfig | undefined) => {
  let gateway = config?.pinata_gateway;
  if (config && gateway) {
    if (gateway && !gateway.startsWith("https://")) {
      gateway = `https://${gateway}`;
    }
    config.pinata_gateway = gateway;
  }
  return config;
};

export class PinataSDK {
  config: PinataConfig | undefined;
  upload: Upload;

  constructor(config?: PinataConfig) {
    this.config = formatConfig(config);
    this.upload = new Upload(this.config);
  }

  testAuthentication(): Promise<any> {
    return testAuthentication(this.config);
  }

  unpin(files: string[]): Promise<any> {
    return unpinFile(this.config, files);
  }

  listFiles(): FilterFiles {
    return new FilterFiles(this.config);
  }
}

class UploadBuilder<T> {
  private config: PinataConfig | undefined;
  private uploadFunction: (
    config: PinataConfig | undefined,
    ...args: any[]
  ) => Promise<T>;
  private args: any[];
  private metadata: PinataMetadata | undefined;

  constructor(
    config: PinataConfig | undefined,
    uploadFunction: (
      config: PinataConfig | undefined,
      ...args: any[]
    ) => Promise<T>,
    ...args: any[]
  ) {
    this.config = config;
    this.uploadFunction = uploadFunction;
    this.args = args;
  }

  addMetadata(metadata: PinataMetadata): UploadBuilder<T> {
    this.metadata = metadata;
    return this;
  }

  then(onfulfilled?: ((value: T) => any) | null): Promise<any> {
    const options: UploadOptions = this.args[this.args.length - 1] || {};
    if (this.metadata) {
      options.metadata = this.metadata;
    }
    this.args[this.args.length - 1] = options;
    return this.uploadFunction(this.config, ...this.args).then(onfulfilled);
  }
}

class FilterFiles {
  private config: PinataConfig | undefined;
  private query: PinListQuery = {};

  constructor(config: PinataConfig | undefined) {
    this.config = config;
  }

  cid(cid: string): FilterFiles {
    this.query.cid = cid;
    return this;
  }

  pinStart(date: string): FilterFiles {
    this.query.pinStart = date;
    return this;
  }

  pinEnd(date: string): FilterFiles {
    this.query.pinEnd = date;
    return this;
  }

  pinSizeMin(size: number): FilterFiles {
    this.query.pinSizeMin = size;
    return this;
  }

  pinSizeMax(size: number): FilterFiles {
    this.query.pinSizeMax = size;
    return this;
  }

  pageLimit(limit: number): FilterFiles {
    this.query.pageLimit = limit;
    return this;
  }

  pageOffset(offset: number): FilterFiles {
    this.query.pageOffset = offset;
    return this;
  }

  name(name: string): FilterFiles {
    this.query.name = name;
    return this;
  }

  keyValue(
    key: string,
    value: string,
    operator?: PinListQuery["operator"],
  ): FilterFiles {
    this.query.key = key;
    this.query.value = value;
    if (operator) {
      this.query.operator = operator;
    }
    return this;
  }

  then(onfulfilled?: ((value: PinListItem[]) => any) | null): Promise<any> {
    return listFiles(this.config, this.query).then(onfulfilled);
  }
}

class Upload {
  config: PinataConfig | undefined;

  constructor(config?: PinataConfig) {
    this.config = formatConfig(config);
  }

  file(file: FileObject, options?: UploadOptions): UploadBuilder<PinResponse> {
    return new UploadBuilder(this.config, uploadFile, file, options);
  }

  fileArray(
    files: FileObject[],
    options?: UploadOptions,
  ): UploadBuilder<PinResponse> {
    return new UploadBuilder(this.config, uploadFileArray, files, options);
  }

  base64(
    base64String: string,
    options?: UploadOptions,
  ): UploadBuilder<PinResponse> {
    return new UploadBuilder(this.config, uploadBase64, base64String, options);
  }

  url(url: string, options?: UploadOptions): UploadBuilder<PinResponse> {
    return new UploadBuilder(this.config, uploadUrl, url, options);
  }

  json(data: object, options?: UploadOptions): UploadBuilder<PinResponse> {
    return new UploadBuilder(this.config, uploadJson, data, options);
  }

  cid(
    cid: string,
    options?: UploadCIDOptions,
  ): UploadBuilder<PinByCIDResponse> {
    return new UploadBuilder(this.config, uploadCid, cid, options);
  }
}
