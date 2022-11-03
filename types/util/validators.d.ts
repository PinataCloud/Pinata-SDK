import { PinataConfig } from '..';
export interface axiosHeaders {
    maxContentLength: number;
    maxBodyLength: number;
    headers: {
        [key: string]: any;
    };
    withCredentials?: boolean;
}
export declare function validateApiKeys(pinataApiKey?: string, pinataSecretApiKey?: string): void;
export declare function createConfigForAxiosHeaders(config: PinataConfig): {
    withCredentials: boolean;
    headers: {
        pinata_api_key: string;
        pinata_secret_api_key: string;
        Authorization?: undefined;
    };
} | {
    headers: {
        Authorization: string;
        pinata_api_key?: undefined;
        pinata_secret_api_key?: undefined;
    };
    withCredentials?: undefined;
};
export declare function createConfigForAxiosHeadersWithFormData(config: PinataConfig, boundaryValue: string): axiosHeaders;
export declare function validateHostNodes(hostNodes: any): void;
export declare function validateMetadata(metadata: any): void;
export declare function validatePinPolicyStructure(pinPolicy: {
    regions: any[];
}): void;
export declare function validatePinataOptions(options: {
    cidVersion?: number;
    wrapWithDirectory?: boolean;
    hostNodes?: any;
    customPinPolicy?: any;
}): void;
