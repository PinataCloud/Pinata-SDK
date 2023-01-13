import React from 'react';
import { createRoot } from 'react-dom/client';
import SubmarineWidget from './submarine-video';
import WalletProvider from './WalletProvider';

export default function renderWidget(optionToRender: any) {
    console.log('render widget');
    if (!document) {
        throw Error('impossible to render');
    }

    const div = document.getElementById(optionToRender.divId);
    if (!div) {
        throw Error('impossible to render');
    }

    const root = createRoot(div);
    if (optionToRender.type === 'etherum-wallet') {
        root.render(
            <WalletProvider>
                <SubmarineWidget {...optionToRender} />
            </WalletProvider>
        );
    } else {
        root.render(<SubmarineWidget {...optionToRender} />);
    }
}
