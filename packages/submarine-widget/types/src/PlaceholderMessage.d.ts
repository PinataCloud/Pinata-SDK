/// <reference types="react" />
interface IPlaceholderContent {
    message: string;
}
interface IPlaceholderMessage {
    placeholderContent: IPlaceholderContent;
    bundle?: any;
}
export declare const MESSAGES_TYPES: {
    LOADING: {
        message: string;
    };
    LOCATION_ACCESS_NEEDED: {
        message: string;
    };
    LOCATION_ACCESS_DENIED: {
        message: string;
    };
    LOCATION_ERROR_OUT_OF_BOUNDARY: {
        message: string;
    };
    WALLET_MISSING_INFO: {
        message: string;
    };
    WALLET_SIGNATURE_ERROR: {
        message: string;
    };
    WALLET_INVALID_OPTION: {
        message: string;
    };
    ERROR_GENERAL: {
        message: string;
    };
};
export default function PlaceholderMessage(props: IPlaceholderMessage): JSX.Element;
export {};
