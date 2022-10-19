/**
 * Validate API Keys
 * @param {string} pinataApiKey
 * @param {string} pinataSecretApiKey
 */
export function validateApiKeys(pinataApiKey: string, pinataSecretApiKey: string): void;
export function createConfigForAxiosHeaders(config: any): {
    withCredentials: boolean;
    headers: {
        pinata_api_key: any;
        pinata_secret_api_key: any;
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
export function createConfigForAxiosHeadersWithFormData(config: any, boundaryValue: any): {
    maxContentLength: number;
    maxBodyLength: number;
    withCredentials: boolean;
    headers: {
        pinata_api_key: any;
        pinata_secret_api_key: any;
        Authorization?: undefined;
    };
} | {
    maxContentLength: number;
    maxBodyLength: number;
    headers: {
        Authorization: string;
        pinata_api_key?: undefined;
        pinata_secret_api_key?: undefined;
    };
    withCredentials?: undefined;
};
/**
 * Validate host Nodes
 * @param {*} hostNodes
 */
export function validateHostNodes(hostNodes: any): void;
/**
 * Validate MetaData
 * @param {*} metadata
 */
export function validateMetadata(metadata: any): void;
/**
 * Validate Pin Policy Structure
 * @param {*} pinPolicy
 */
export function validatePinPolicyStructure(pinPolicy: any): void;
/**
 * Validate Pinata Options
 * @param {*} options
 */
export function validatePinataOptions(options: any): void;
