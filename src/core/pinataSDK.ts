import {
  FileObject,
  PinByCIDResponse,
  PinListItem,
  PinListQuery,
  PinResponse,
  PinataConfig,
  PinataMetadata,
  PinataMetadataUpdate,
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
import { updateMetadata } from "./data/updateMetadata";

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

  updateMetadata(options: PinataMetadataUpdate): Promise<string> {
    return updateMetadata(this.config, options);
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
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): Promise<TResult1 | TResult2> {
    const options: UploadOptions = this.args[this.args.length - 1] || {};
    if (this.metadata) {
      options.metadata = this.metadata;
    }
    this.args[this.args.length - 1] = options;
    return this.uploadFunction(this.config, ...this.args).then(
      onfulfilled,
      onrejected,
    );
  }
}

class FilterFiles {
  private config: PinataConfig | undefined;
  private query: PinListQuery = {};
  // rate limit vars
  private requestCount: number = 0;
  private lastRequestTime: number = 0;
  private readonly MAX_REQUESTS_PER_MINUTE = 30;
  private readonly MINUTE_IN_MS = 60000;

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

  // rate limit, hopefully temporary?
  private async rateLimit(): Promise<void> {
    this.requestCount++;
    const now = Date.now();
    if (this.requestCount >= this.MAX_REQUESTS_PER_MINUTE) {
      const timePassedSinceLastRequest = now - this.lastRequestTime;
      if (timePassedSinceLastRequest < this.MINUTE_IN_MS) {
        const delayTime = this.MINUTE_IN_MS - timePassedSinceLastRequest;
        await new Promise((resolve) => setTimeout(resolve, delayTime));
      }
      this.requestCount = 0;
    }
    this.lastRequestTime = Date.now();
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<PinListItem, void, unknown> {
    let hasMore = true;
    let offset = 0;
    const limit = this.query.pageLimit || 10;

    while (hasMore) {
      await this.rateLimit(); // applying rate limit
      this.query.pageOffset = offset;
      this.query.pageLimit = limit;

      const items = await listFiles(this.config, this.query);

      for (const item of items) {
        yield item;
      }

      if (items.length === 0) {
        hasMore = false;
      } else {
        offset += items.length;
      }
    }
  }

  async all(): Promise<PinListItem[]> {
    const allItems: PinListItem[] = [];
    for await (const item of this) {
      allItems.push(item);
    }
    return allItems;
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
