import React from 'react';
import { createRoot } from 'react-dom/client';
import SubmarineWidget from './submarine-video';

export default function renderWidget(optionToRender: any) {
    console.log('render widget');
    if (!document) {
        throw Error('impossible to render');
    }

    // this.handleSign();
    const div = document.getElementById(optionToRender.divId);
    if (!div) {
        throw Error('impossible to render');
    }

    const root = createRoot(div);
    root.render(<SubmarineWidget {...optionToRender} />);
}

