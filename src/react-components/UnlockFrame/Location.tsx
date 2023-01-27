import React from 'react';
import { verifyLocation } from '../../SubmarineAPI';
import SentinelUnlockContent from './SentinelUnlockContent';

export default function Location(options: any) {
    const unlockContentVerifier = async () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Your device does not support geolocation');
            }
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    try {
                        const content = await verifyLocation(
                            latitude,
                            longitude,
                            options.shortId
                        );

                        if (
                            content.data?.token &&
                            content.data?.gateway &&
                            content.data?.cid
                        ) {
                            resolve({
                                gatewayURL: content.data.gateway,
                                cid: content.data.cid,
                                token: content.data.token
                            });
                        }
                    } catch (error) {
                        reject('Could not verify location');
                    }
                },
                // error callback
                () =>
                    reject(
                        'Location services may be disabled on your device, please enable them.'
                    )
            );
        });
    };

    return (
        <>
            <SentinelUnlockContent
                unlockContent={unlockContentVerifier}
            ></SentinelUnlockContent>
        </>
    );
}
