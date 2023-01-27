import React from 'react';
import Button from '@mui/material/Button';
import SentinelUnlockContent from './SentinelUnlockContent';

import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { verifyContract, verifyWallet } from '../../SubmarineAPI';

export default function Wallet(options: any) {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { signMessageAsync } = useSignMessage();

    const unlockContentVerifier = async () => {
        const { shortId, cid, contract, blockchain, tokenId, network } =
            options;
        if (!contract || !blockchain || !network) {
            throw new Error('Missing unlock info');
        }
        const messageToSign: any = await verifyContract(contract, shortId);
        const messageData: string = messageToSign.data.message;
        console.log('messageToSign', messageToSign.data);
        const signature = await signMessageAsync({
            message: messageData
        });

        console.log('sig', signature);

        const content = await verifyWallet({
            address: address,
            signature,
            network,
            contractAddress: contract,
            blockchain,
            tokenId,
            CID: cid,
            shortId: shortId,
            messageId: messageToSign.data.session.id
        });

        console.log('content', content);
        return {
            gatewayURL: content.data.gateway,
            cid: content.data.cid,
            token: content.data.token
        };
    };

    return isConnected ? (
        <>
            <SentinelUnlockContent
                unlockContent={unlockContentVerifier}
            ></SentinelUnlockContent>
        </>
    ) : (
        <>
            {connectors.map((connector) => {
                return (
                    <div key={connector.name} style={{ marginTop: '8px' }}>
                        {connector.ready && (
                            <Button
                                disabled={!connector.ready}
                                key={connector.id}
                                onClick={() => connect({ connector })}
                            >
                                {connector.name}
                                {!connector.ready && ' (unsupported)'}
                            </Button>
                        )}
                    </div>
                );
            })}
        </>
    );
}
