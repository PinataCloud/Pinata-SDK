import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import Skeleton from './skeleton';
import { useAccount, useSignMessage } from 'wagmi';

const submarineServiceURL = 'https://submarine-5wfv90xfh-pinata.vercel.app';

export default function SubmarineWidget(options: any) {
    let signMessageAsync: any;
    let address: any;
    const [skeletonType, setSkeletonType] = useState('');
    const [urlToPlayVideo, setUrlToPlayVideo] = useState('');

    if (options.type === 'etherum-wallet') {
        signMessageAsync = useSignMessage().signMessageAsync;
        address = useAccount().address;
    }

    const [grantedAccessToLocation, setGrantedAccessToLocation] = useState<
        null | any
    >(null);

    function setupPinOnVideo(gatewayURL: string, cid: string, token?: string) {
        const url = !token ?
            `${gatewayURL}/ipfs/${cid}` :
            `${gatewayURL}/ipfs/${cid}?accessToken=${token}`;

        setUrlToPlayVideo(url);
    }

    useEffect(() => {
        const fetchWalletEtherum = async () => {
            const { shortId, cid, contract, blockchain, tokenId, network } =
                options;

            if (!contract || !blockchain || !network) {
                setSkeletonType('wallet-missing-info');
                return;
            }
            const messageToSign: any = await axios.get(
                `${submarineServiceURL}/api/verify?contract=${contract}&shortId=${shortId}`
            );
            const messageData: string = messageToSign.data.message;
            const signature = await signMessageAsync({
                message: messageData
            }).catch(() => {
                setSkeletonType('wallet-signature-error');
                throw new Error('Signature error');
            });
            try {
                const content = await axios.post(
                    `${submarineServiceURL}/api/verify`,
                    {
                        address: address,
                        signature,
                        network,
                        contractAddress: contract,
                        blockchain,
                        tokenId,
                        CID: cid,
                        shortId: shortId,
                        messageId: messageToSign.session.id
                    }
                );
                setupPinOnVideo(
                    content.data.gateway,
                    content.data.cid,
                    content.data.token
                );
                return;
            } catch (err) {
                setSkeletonType('wallet-incorrect-payload');
            }
        };
        const fetchWalletFlow = async () => {
            // https://submarine-lpblan4s0-pinata.vercel.app/api/flow/verify
            console.log('wallet-flow');
            const content = await axios.post(
                `${submarineServiceURL}/api/flow/verify`,
                {
                    signature: options.signature,
                    shortId: options.shortId
                }
            );

            if (
                content.data?.token &&
                content.data?.gateway &&
                content.data?.cid
            ) {
                setupPinOnVideo(
                    content.data.gateway,
                    content.data.cid,
                    content.data.token
                );
            }
        };

        if (options.type === 'location' && navigator?.geolocation) {
            setSkeletonType('location-access-needed');
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    if (location) {
                        console.log(location.coords);
                        setGrantedAccessToLocation({
                            lat: location.coords.latitude,
                            long: location.coords.longitude
                        });
                    }
                },
                () => {
                    setSkeletonType('location-access-denied');
                }
            );
        }
        console.log('type', options.type);

        if (options.type === 'flow-wallet') {
            fetchWalletFlow();
        }

        // https://submarine-lpblan4s0-pinata.vercel.app/api/flow/verify

        if (
            typeof options?.gatewayURL === 'string' &&
            typeof options?.cid === 'string'
        ) {
            setupPinOnVideo(options.gatewayURL, options.cid);

            // setLoaded(true);
        }

        if (options.type === 'etherum-wallet') {
            fetchWalletEtherum();
        }
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            const content = await axios.post(
                `${submarineServiceURL}/api/location/verify`,
                {
                    shortId: options.shortId,
                    userLat: grantedAccessToLocation.lat,
                    userLong: grantedAccessToLocation.long
                }
            );

            console.log(content.data);

            if (
                content.data?.token &&
                content.data?.gateway &&
                content.data?.cid
            ) {
                setupPinOnVideo(
                    content.data.gateway,
                    content.data.cid,
                    content.data.token
                );
            }
        };

        if (grantedAccessToLocation?.lat && grantedAccessToLocation?.long) {
            setSkeletonType('');

            try {
                fetchLocation();
                console.log(
                    grantedAccessToLocation,
                    grantedAccessToLocation?.lat &&
                        grantedAccessToLocation?.long
                );
            } catch (error) {
                setSkeletonType('error-content-outside-location');
            }
        }

        return function clear() {
            setGrantedAccessToLocation(null);
        };
    }, [grantedAccessToLocation]);

    if (
        skeletonType !== 'error' &&
        urlToPlayVideo?.length &&
        urlToPlayVideo.length > 0
    ) {
        return (
            <>
                <ReactPlayer
                    url={urlToPlayVideo}
                    controls={true}
                    playing={true}
                    pip={true}
                    muted={true}
                    stopOnUnmount={true}
                    width="100%"
                    height="100%"
                    onError={() => console.log('Cannot play this Media')}
                />
            </>
        );
    }

    return <Skeleton type={skeletonType}></Skeleton>;
}
