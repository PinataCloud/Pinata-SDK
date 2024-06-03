import { FileArray, FileObject, PinResponse, PinataConfig, PinataMetadata } from "./types";
import { testAuthentication } from "./authentication/testAuthentication";
import { uploadFile } from "./pinning/file";
import { uploadFileArray } from "./pinning/fileArray";

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

  file(file: FileObject, options: PinataMetadata): Promise<PinResponse> {
    return uploadFile(this.config, file, options)
  }

  fileArray(files: FileObject[]): Promise<PinResponse> {
    return uploadFileArray(this.config, files)
  }
}

