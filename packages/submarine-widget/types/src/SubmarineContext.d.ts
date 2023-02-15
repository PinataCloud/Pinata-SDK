/// <reference types="react" />
export declare enum MESSAGE_TYPES_SUB {
    LOADING = "LOADING",
    LOCATION_ACCESS_NEEDED = "LOCATION_ACCESS_NEEDED",
    LOCATION_ACCESS_DENIED = "LOCATION_ACCESS_DENIED",
    LOCATION_ERROR_OUT_OF_BOUNDARY = "LOCATION_ERROR_OUT_OF_BOUNDARY",
    WALLET_MISSING_INFO = "WALLET_MISSING_INFO",
    WALLET_SIGNATURE_ERROR = "WALLET_SIGNATURE_ERROR",
    WALLET_INVALID_OPTION = "WALLET_INVALID_OPTION",
    ERROR_GENERAL = "ERROR_GENERAL",
    PLAY_URL = "PLAY_URL"
}
declare function SubmarineProvider({ children }: {
    children: any;
}): JSX.Element;
declare function useSubmarine(): {};
export { SubmarineProvider, useSubmarine };
