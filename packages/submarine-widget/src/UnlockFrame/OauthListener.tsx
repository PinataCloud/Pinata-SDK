import React, { useEffect, useState } from "react";
const OauthListener = ({ winRef, storageKey: key, onKeySet }) => {
  onstorage = (event) => {
    if (event.key === key) {
      onKeySet && onKeySet();
      winRef && winRef.close();
    }
  };
  return <></>;
};

export default OauthListener;

export const isURL = (str: unknown): str is string => {
  try {
    // eslint-disable-next-line no-new
    new URL(str as string);
    return true;
  } catch (e) {
    return false;
  }
};
