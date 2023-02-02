import React from "react";
import Button from "@mui/material/Button";
import { MESSAGE_TYPES_SUB, useSubmarine } from "../SubmarineContext";
import ContentDisplay, { FILE_TYPE } from "../ContentDisplay";

export default function SentinelUnlockContent(props) {
    const { dispatch, state } = useSubmarine();
    const handleUnlock = async () => {
        try {
            const submarinedContent = await props.unlockContent();
            dispatch({
                type: MESSAGE_TYPES_SUB.PLAY_URL,
                gatewayURL: submarinedContent.gatewayURL,
                cid: submarinedContent.cid,
                token: submarinedContent.token,
                fileType: FILE_TYPE.VIDEO,
            });
            if (submarinedContent) {
                // dispatch(setSubmarinedContent(submarinedContent));
            }
            //   setVerifying(false);
        } catch (err) {
            //   dispatch(setAlert({ type: "error", message: err }));
            //   setVerifying(false);
        }
    };

    return state.fileURL && state.fileURL.length > 0 ? (
        <>
            <ContentDisplay {...props}></ContentDisplay>
        </>
    ) : (
        <div>
            <Button
                sx={{
                    width: "90%",
                    maxWidth: "300px",
                    backgroundColor: (theme) => theme.palette.primary.light,
                    color: "#000000",
                }}
                onClick={handleUnlock}
            >
                verify
            </Button>
        </div>
    );
}
