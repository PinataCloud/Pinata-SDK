import { PinataConfig } from '../..';
import { PinataPinOptions, PinataPinResponse } from './pinFileToIPFS';
export default function pinJSONToIPFS(config: PinataConfig, body: any, options?: PinataPinOptions): Promise<PinataPinResponse>;
