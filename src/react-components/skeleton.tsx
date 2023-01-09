import React from 'react';
function LoadedComponent() {
    return <>It's loading please Wait!</>;
}

function LocationAccessNeeded() {
    return <>Need to grant access to location</>;
}

function LocationAccessDenied() {
    return <>To Bad Access was denied</>;
}

function ErrorOutsideLocation() {
    return <>ErrorOutsideLocation</>;
}

function ErrorComponent() {
    return <>I can't render that sorry</>;
}

export default function Skeleton(props) {
    if (props.type === 'error') {
        return <ErrorComponent></ErrorComponent>;
    }
    if (props.type === 'location-access-needed') {
        return <LocationAccessNeeded></LocationAccessNeeded>;
    }

    if (props.type === 'location-access-denied') {
        return <LocationAccessDenied></LocationAccessDenied>;
    }

    if (props.type === 'error-content-outside-location') {
        return <ErrorOutsideLocation></ErrorOutsideLocation>;
    }
    if (props.type === 'wallet-missing-info') {
        return <ErrorOutsideLocation></ErrorOutsideLocation>;
    }
    if (props.type === 'wallet-signature-error') {
        return <ErrorOutsideLocation></ErrorOutsideLocation>;
    }

    if (props.type === 'wallet-incorrect-payload') {
        return <ErrorOutsideLocation></ErrorOutsideLocation>;
    }
    return <LoadedComponent></LoadedComponent>;
}
