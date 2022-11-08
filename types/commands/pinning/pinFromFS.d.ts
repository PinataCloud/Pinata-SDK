import { PinataConfig } from '../..';
import { PinataPinOptions, PinataPinResponse } from './pinFileToIPFS';
export declare function normalizePath(p: string): string;
export default function pinFromFS(config: PinataConfig, sourcePath: string, options?: PinataPinOptions): Promise<PinataPinResponse>;
