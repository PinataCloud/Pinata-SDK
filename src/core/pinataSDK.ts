import { FileObject, PinResponse, PinataConfig, UploadOptions } from "./types";
import { testAuthentication } from "./authentication/testAuthentication";
import { uploadFile } from "./pinning/file";
import { uploadFileArray } from "./pinning/fileArray";
import { uploadBase64 } from "./pinning/base64";
import { uploadUrl } from "./pinning/url";

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
  upload:  Upload;

  constructor(config?: PinataConfig) {
    this.config = formatConfig(config);
    this.upload = new Upload(this.config);
  }

  testAuthentication(): Promise<any> {
    return testAuthentication(this.config);
  }

}

class Upload {
  config: PinataConfig | undefined;

  constructor(config?: PinataConfig) {
    this.config = formatConfig(config);
  }

  file(file: FileObject, options?: UploadOptions): Promise<PinResponse> {
    return uploadFile(this.config, file, options)
  }

  fileArray(files: FileObject[], options?: UploadOptions): Promise<PinResponse> {
    return uploadFileArray(this.config, files, options)
  }

  base64(base64String: string, options?: UploadOptions): Promise<PinResponse> {
    return uploadBase64(this.config, base64String, options)
  }

  url(url: string, options?: UploadOptions): Promise<PinResponse> {
    return uploadUrl(this.config, url, options)
  }
}
