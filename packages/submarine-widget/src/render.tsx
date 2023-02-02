import React from "react";
import { createRoot } from "react-dom/client";
import SubmarineWidget from "./SubmarineWidget";

export default function renderWidget(optionToRender: any) {
    if (!document) {
        throw Error("impossible to render");
    }

    const div = document.getElementById(optionToRender.divId);
    if (!div) {
        throw Error("impossible to render");
    }

    const root = createRoot(div);
    root.render(<SubmarineWidget {...optionToRender} />);    
}

module.exports = {renderWidget};
