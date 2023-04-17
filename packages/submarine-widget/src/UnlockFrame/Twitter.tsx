import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Typography, Unstable_Grid2 } from "@mui/material";
import { TwitterTweetEmbed } from "react-twitter-embed";

import { LockTypeProps } from "../LockTypesContainer";
import UnlockButton from "./UnlockButton";

import OauthListener, { isURL } from "./OauthListener";
import { prepareTwitter } from "../SubmarineAPI";
import { useSubmarine } from "../SubmarineContext";

const TWITTER_STORAGE_KEY = "twitter_oauth";

const Twitter = ({ unlockInfo, customizations, isPreview }: LockTypeProps) => {
  const { dispatch, state } = useSubmarine() as any;
  const [hasNotRetweeted, setHasNotRetweeted] = useState<boolean>(false);

  const [twitterCreds, setTwitterCreds] = useState<any>(null);

  useEffect(() => {
    const { oauth_token, oauth_verifier } = JSON.parse(
      localStorage.getItem(TWITTER_STORAGE_KEY) || "{}"
    );
    if (oauth_token && oauth_verifier) {
      setTwitterCreds({ oauth_token, oauth_verifier });
    }
  }, []);

  const [winRef, setWin] = useState<Window | null>(null);
  const twitterAuth = async () => {
    try {
      const response = await prepareTwitter(state.apiURL);
      const url = await response.data;
      if (isURL(url)) {
        const win = window.open(url, "*");
        setWin(win);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleVerification = async (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      const { oauth_token, oauth_verifier } = twitterCreds || {};
      if (!oauth_token || !oauth_verifier) {
        reject("Could not verify retweet");
      }
      const payload: any = {
        type: "retweet",
        oauth_verifier,
      };
      resolve(payload);
    });
  };
  const openTweet = () => {
    setHasNotRetweeted(false);
    if (unlockInfo.type === "retweet") {
      window.open(`${unlockInfo?.tweetUrl}`, "_blank");
    }
  };
  // const description = (
  //   <Typography
  //     variant="h6"
  //     // sx={{
  //     //   padding: (theme) => theme.spacing(1),
  //     //   color: (theme) => theme.palette.primary.contrastText,
  //     // }}
  //   >
  //     Connect your Twitter account and retweet the tweet to unlock content
  //   </Typography>
  // );

  const description = (
    <>
      <h6>
        Connect your Twitter account and retweet the tweet to unlock content{" "}
      </h6>
    </>
  );
  const customBttnStyle = {
    width: "90%",
    maxWidth: "300px",
    borderRadius: 1000,
    ...(customizations?.buttonShape === "square" && {
      borderRadius: 2,
    }),
    backgroundColor: (theme) => theme.palette.primary.light,
    ...(customizations?.buttonColor &&
      customizations?.buttonColor?.hex && {
        backgroundColor: customizations.buttonColor.hex,
      }),
    color: "#000000",
    ...(customizations?.buttonTextColor &&
      customizations?.buttonTextColor.hex && {
        color: customizations.buttonTextColor.hex,
      }),
  };
  const tweetId =
    unlockInfo?.tweetUrl &&
    unlockInfo?.tweetUrl.split("status/")?.[1]?.split("?")?.[0];
  const containerOptions = isPreview
    ? {
        xs: 12,
      }
    : {
        xs: 12,
        md: 6,
      };
  const removeTwCreds = () => {
    localStorage.removeItem(TWITTER_STORAGE_KEY);
    setTwitterCreds(null);
  };
  const onKeySet = () => {
    const { oauth_token, oauth_verifier } = JSON.parse(
      localStorage.getItem(TWITTER_STORAGE_KEY) || "{}"
    );
    setTwitterCreds({ oauth_token, oauth_verifier });
  };
  return (
    <Unstable_Grid2 container direction={"column"} justifyContent={"center"}>
      <OauthListener
        storageKey={TWITTER_STORAGE_KEY}
        winRef={winRef}
        onKeySet={onKeySet}
      />
      <Container maxWidth={"md"}>
        <Unstable_Grid2 container justifyContent={"center"}>
          <TwitterTweetEmbed
            options={{ conversation: "none" }}
            tweetId={tweetId}
          />
        </Unstable_Grid2>
        {twitterCreds ? (
          <UnlockButton
            description={description}
            unlockInfo={unlockInfo}
            customizations={customizations}
            lockName={"retweet"}
            getPayload={handleVerification}
          />
        ) : (
          <Unstable_Grid2
            container
            flexDirection={"column"}
            sx={{ gap: "1em", justifyContent: "center", alignItems: "center" }}
          >
            {hasNotRetweeted && (
              <Button
                variant="contained"
                onClick={openTweet}
                sx={customBttnStyle}
              >
                Retweet Tweet
              </Button>
            )}
            <Button
              variant="contained"
              onClick={twitterAuth}
              sx={customBttnStyle}
            >
              Connect Twitter
            </Button>
          </Unstable_Grid2>
        )}
      </Container>
    </Unstable_Grid2>
  );
};
export default Twitter;
