import React from "react";

import SentinelUnlockContent from "./SentinelUnlockContent"

export default function Open(options: any) {
    const playContent = async () => {
        return { gatewayURL: options.gatewayURL, cid: options.cid };
    };

    return (
        <>
            <SentinelUnlockContent
                unlockContent={playContent}
            ></SentinelUnlockContent>
        </>
    );
}
