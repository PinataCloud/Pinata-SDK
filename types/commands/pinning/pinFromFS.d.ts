import { PinataConfig } from '../..';
import { PinataPinOptions, PinataPinResponse } from './pinFileToIPFS';
export default function pinFromFS(config: PinataConfig, sourcePath: string, options?: PinataPinOptions): Promise<PinataPinResponse>;
