import React, { useEffect, useState } from "react";
import Theme from "./Theme";
import {
  MESSAGE_TYPES_SUB,
  SubmarineProvider,
  useSubmarine,
} from "./SubmarineContext";
import Open from "./UnlockFrame/Open";
import Location from "./UnlockFrame/Location";
import Wallet from "./UnlockFrame/Wallet";
import WalletProvider from "./WalletProvider";
import { getContent, setSubmarineService } from "./SubmarineAPI";
import Twitter from "./UnlockFrame/Twitter";
import Typography from "@mui/material/Typography";
import CustomThemeProvider from "./theme/ThemeProvider";

export interface SubmarineWidgetOption {
  [key: string]: any;
}

export enum UNLOCK_TYPES {
  location = "location",
  retweet = "retweet",
  twitch = "twitch",
  evm = "evm",
  solana = "solana",
  flow = "flow",
}
const SubmarineUnlockSelector = (props) => {
  const { submarineUnlockInfo } = props;
  // if (submarineUnlockInfo.type === UNLOCK_TYPES.location) {
  //   return <Location unlockInfo={submarineUnlockInfo}></Location>;
  // }

  if (submarineUnlockInfo.type === UNLOCK_TYPES.retweet) {
    return (
      <Twitter
        unlockInfo={submarineUnlockInfo}
        // customizations={fileInfo.customizations}
        // isPreview={isPreview}
      />
    );
  }

  // if (submarineUnlockInfo.type === UNLOCK_TYPES.twitch) {
  //   return (
  //     <Twitch
  //       unlockInfo={unlockInfo}
  //       customizations={fileInfo.customizations}
  //     />
  //   );
  // }
  // if (submarineUnlockInfo.type === UNLOCK_TYPES.evm) {
  //   return (
  //     <WalletProvider>
  //       <Wallet {...props}></Wallet>
  //     </WalletProvider>
  //   );
  // }

  // if (submarineUnlockInfo.type === UNLOCK_TYPES.solana) {
  //   return (
  //     <SolanaProvider>
  //       <Solana
  //         unlockInfo={unlockInfo}
  //         customizations={fileInfo.customizations}
  //       />
  //     </SolanaProvider>
  //   );
  // }

  // if (submarineUnlockInfo.type === UNLOCK_TYPES.flow) {
  //   return (
  //     <FlowUnlock
  //       unlockInfo={unlockInfo}
  //       customizations={fileInfo.customizations}
  //     />
  //   );
  // }

  return null;
};

const SubmarineContent = () => {
  const { dispatch, state } = useSubmarine() as any;

  return (
    <>
      {state.submarineContent.unlockInfo.map((info) => (
        <SubmarineUnlockSelector
          key={info.type}
          submarineUnlockInfo={info}
        ></SubmarineUnlockSelector>
      ))}
    </>
  );
};

function SubmarineLocker(props) {
  const UNLOCK_METHOD_SUPPORTED = [
    UNLOCK_TYPES.location,
    UNLOCK_TYPES.retweet,
    UNLOCK_TYPES.twitch,
    UNLOCK_TYPES.evm,
  ];
  const [loadAPI, setLoadAPI] = useState(false);
  const [submarineContentError, setSubmarineContentError] = useState(false);
  const { dispatch, state } = useSubmarine() as any;

  useEffect(() => {
    if (props.apiURL) {
      dispatch({ type: MESSAGE_TYPES_SUB.LOAD_API, apiURL: props.apiURL });
    }

    setLoadAPI(true);
  }, []);

  useEffect(() => {
    const initContent = async () => {
      try {
        const content = await getContent(state.apiURL, {
          shortId: props.shortId,
        });

        dispatch({
          type: MESSAGE_TYPES_SUB.LOAD_SUBMARINE_CONTENT,
          submarineContent: content.data,
        });
        console.log("dataContent", content.data);
      } catch (error) {
        console.log("error", error);
        setSubmarineContentError(true);
      }
    };

    if (loadAPI) {
      initContent();
    }
  }, [loadAPI]);

  if (submarineContentError) {
    return <>"error content not found"</>;
  }

  // There's one unlock method not supported
  if (
    state?.submarineContent?.unlockInfo?.length > 0 &&
    state.submarineContent.unlockInfo.find(
      (info) => !UNLOCK_METHOD_SUPPORTED.includes(info.type)
    )
  ) {
    return <>Unlock Method not supported</>;
  }
  if (state?.submarineContent?.id) {
    return <SubmarineContent></SubmarineContent>;
  }

  return <>Loading</>;
  return <>
     <Typography
      variant="h6"
      sx={{
        padding: (theme) => theme.spacing(1),
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      Loading...
  </Typography></>;
}
export default function SubmarineWidget(props: SubmarineWidgetOption) {
  // const loggerClient = LoggerService.getInstance();
  // loggerClient.attachToConsole();
  return (
    <SubmarineProvider>
      <CustomThemeProvider>
        <SubmarineLocker {...props}></SubmarineLocker>
      </CustomThemeProvider>
    </SubmarineProvider>
  );
}
