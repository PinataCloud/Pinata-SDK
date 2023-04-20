import React from "react";
import ReactPlayer from "react-player";
import { useSubmarine } from "./SubmarineContext";

export enum FILE_TYPE {
  VIDEO = "VIDEO",
}

function Video(props: any) {
  console.log("video", props.fileURL);
  return (
    <>
      <ReactPlayer
        url={props.fileURL}
        controls={true}
        playing={true}
        pip={true}
        muted={true}
        stopOnUnmount={true}
        width="100%"
        height="100%"
        onError={() => console.log("Cannot play this Media")}
      />
    </>
  );
}

function Image(props: any) {
  return <>here is an Image</>;
}

function File(props: any) {
  return <>Here is a File</>;
}

export default function ContentDisplay(props: any) {
  const { state } = useSubmarine() as any;
  console.log("ContentDisplay", state);

  if (state.fileType === FILE_TYPE.VIDEO) {
    return <Video fileURL={state.fileURL}></Video>;
  }
  if (state.type === "image") {
    return <Image {...props}></Image>;
  }

  return <File {...props}></File>;
}
