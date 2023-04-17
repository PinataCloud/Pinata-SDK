import { Button, IconButton } from "@mui/material";
import React, {useState} from "react";

import CustomButton from "./CustomButton";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useSubmarine } from "../SubmarineContext";
import { dryRun } from "../SubmarineAPI";
interface UnlockButtonProps {
  unlockInfo: any;
  customizations: any | null;
  getPayload: () => Promise<any>;
  description: JSX.Element;
  lockName: string;
}

const isButtonCustom = (customizations) => {
  if (
    customizations &&
    customizations.buttonColor &&
    customizations.buttonColor.hex
  ) {
    return true;
  }

  if (
    customizations &&
    customizations.buttonTextColor &&
    customizations.buttonTextColor.hex
  ) {
    return true;
  }

  if (
    customizations &&
    customizations.buttonShape &&
    customizations.buttonShape !== "rounded"
  ) {
    return true;
  }

  return false;
};

const UnlockButton = ({
  customizations,
  description,
  getPayload,
  lockName,
}: UnlockButtonProps) => {
  const { dispatch, state } = useSubmarine() as any;
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleClick = async () => {
    setVerifying(true);
    try {
      const payload = await getPayload();
      if (payload) {
        const res = await dryRun(state.apiURL, state.shortId, payload).catch(
          async (err) => {
            const serverMessage = await err.response.json();
            console.log({ serverMessage });
            //   dispatch(
            //     setAlert({
            //       type: AlertType.Error,
            //       message: serverMessage.message,
            //     })
            //   );
          }
        );

        if (res?.status && res.status < 400) {
          // dispatch(addPayload(payload));

          //dispatch(tryUnlock());

          setSuccess(true);
        } else {
          // dispatch(
          //   setAlert({ type: AlertType.Error, message: response.message })
          // );
        }
      }
      setVerifying(false);
    } catch (err) {
      console.log(err);
      //   dispatch(setAlert({ type: AlertType.Error, message: err }));
      setVerifying(false);
    }
  };

  return (
    <div>
      {description}
      {success ? (
        <IconButton
          sx={{
            color: "green",
          }}
        >
          <DoneOutlineIcon />
        </IconButton>
      ) : isButtonCustom(customizations) ? (
        <CustomButton
          customizations={customizations ?? undefined}
          onClick={handleClick}
          lockName={lockName}
          loading={verifying}
        />
      ) : (
        <Button
          sx={{
            width: "90%",
            maxWidth: "300px",
            backgroundColor: (theme) => theme.palette.primary.light,
            color: "#000000",
          }}
          onClick={handleClick}
        >
          {verifying ? `Verifying ${lockName}...` : `Verify ${lockName}`}
        </Button>
      )}
    </div>
  );
};

export default UnlockButton;
