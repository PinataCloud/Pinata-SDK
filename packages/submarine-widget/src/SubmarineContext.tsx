import React, { createContext } from "react";
import { MESSAGES_TYPES } from "./PlaceholderMessage";

const SubmarineContextDefaultValue = {
  apiURL: "https://app.submarine.me",
  messageBundle: MESSAGES_TYPES.LOADING,
  fileURL: null,
  fileType: null,
  submarineContent: null,
};
const SubmarineContext = createContext({});

export enum MESSAGE_TYPES_SUB {
  LOADING = "LOADING",
  LOCATION_ACCESS_NEEDED = "LOCATION_ACCESS_NEEDED",
  LOCATION_ACCESS_DENIED = "LOCATION_ACCESS_DENIED",
  LOCATION_ERROR_OUT_OF_BOUNDARY = "LOCATION_ERROR_OUT_OF_BOUNDARY",
  WALLET_MISSING_INFO = "WALLET_MISSING_INFO",
  WALLET_SIGNATURE_ERROR = "WALLET_SIGNATURE_ERROR",
  WALLET_INVALID_OPTION = "WALLET_INVALID_OPTION",
  ERROR_GENERAL = "ERROR_GENERAL",
  PLAY_URL = "PLAY_URL",
  LOAD_API = "LOAD_API",
  
  LOAD_SUBMARINE_CONTENT = "LOAD_SUBMARINE_CONTENT",
  ERROR_SUBMARINE_CONTENT = "ERROR_SUBMARINE_CONTENT",
}

function setupPinOnVideo(gatewayURL: string, cid: string, token?: string) {
  const url = !token
    ? `${gatewayURL}/ipfs/${cid}`
    : `${gatewayURL}/ipfs/${cid}?accessToken=${token}`;

  return url;
}
function SubmarineReducer(state, action) {
  console.log("SubmarineReducer", state, action)
  switch (action.type) {
    case MESSAGE_TYPES_SUB.LOAD_API: {
      return { ...state, apiURL: action.apiURL };
    }
    case MESSAGE_TYPES_SUB.LOAD_SUBMARINE_CONTENT: {
      return { ...state, submarineContent: action.submarineContent };
    }
    case (MESSAGE_TYPES_SUB.LOADING,
    MESSAGE_TYPES_SUB.LOCATION_ACCESS_NEEDED,
    MESSAGE_TYPES_SUB.LOCATION_ACCESS_DENIED,
    MESSAGE_TYPES_SUB.LOCATION_ERROR_OUT_OF_BOUNDARY,
    MESSAGE_TYPES_SUB.WALLET_MISSING_INFO,
    MESSAGE_TYPES_SUB.WALLET_SIGNATURE_ERROR,
    MESSAGE_TYPES_SUB.WALLET_INVALID_OPTION,
    MESSAGE_TYPES_SUB.ERROR_GENERAL): {
      return { state, ...MESSAGES_TYPES[action.type] };
    }
    case MESSAGE_TYPES_SUB.PLAY_URL: {
      console.log(action);
      return {
        fileURL: setupPinOnVideo(action.gatewayURL, action.cid, action.token),
        fileType: action.fileType,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function SubmarineProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    SubmarineReducer,
    SubmarineContextDefaultValue
  );
  // Note if it gets slow, we may need to memoize http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <SubmarineContext.Provider value={value}>
      {children}
    </SubmarineContext.Provider>
  );
}

function useSubmarine() {
  const context = React.useContext(SubmarineContext);
  if (context === undefined) {
    throw new Error("useSubmarine must be used within a Submarine provider");
  }
  return context;
}

export { SubmarineProvider, useSubmarine };
