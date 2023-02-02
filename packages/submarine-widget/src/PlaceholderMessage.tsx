import React from 'react';

interface IPlaceholderContent {
    message: string;
}
interface IPlaceholderMessage {
    placeholderContent: IPlaceholderContent;
    bundle?: any;
}

export const MESSAGES_TYPES = {
    LOADING: {
        message: 'Widget is loading please wait'
    },
    LOCATION_ACCESS_NEEDED: {
        message: 'Location is needed to render content'
    },
    LOCATION_ACCESS_DENIED: {
        message: 'Sorry, could not access location'
    },
    LOCATION_ERROR_OUT_OF_BOUNDARY: {
        message: 'Client is outside the limits of the coordinates'
    },
    WALLET_MISSING_INFO: {
        message: 'Missing information needed to access the wallet'
    },
    WALLET_SIGNATURE_ERROR: {
        message: 'Wallet Signature is invalid'
    },
    WALLET_INVALID_OPTION: {
        message: 'The provided options does not correspond to the wallet'
    },
    ERROR_GENERAL: {
        message: 'Sorry could not render content'
    }
};

export default function PlaceholderMessage(props: IPlaceholderMessage) {
    const message = props.placeholderContent.message;

    return <>{message}</>;
}
