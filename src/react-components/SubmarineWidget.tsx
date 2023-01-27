import React from 'react';
import Theme from './Theme';
import { SubmarineProvider } from './SubmarineContext';
import Open from './UnlockFrame/Open';
import Location from './UnlockFrame/Location';
import Wallet from './UnlockFrame/Wallet';
import WalletProvider from './WalletProvider';
// import LoggerService from "../Logger";

function UnlockSelector(props) {
    let unlockComponent = <Open {...props}></Open>;

    if (props.type === 'etherum-wallet') {
        unlockComponent = (
            <WalletProvider>
                <Wallet {...props}></Wallet>
            </WalletProvider>
        );
    }

    if (props.type === 'location') {
        unlockComponent = <Location {...props}></Location>;
    }
    return <>{unlockComponent}</>;
}
export default function SubmarineWidget(props: any) {
    // const loggerClient = LoggerService.getInstance();
    // loggerClient.attachToConsole();
    return (
        <Theme {...props}>
            <SubmarineProvider>
                <UnlockSelector {...props}></UnlockSelector>
            </SubmarineProvider>
        </Theme>
    );
}
