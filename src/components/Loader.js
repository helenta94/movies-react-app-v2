import React from "react";

export default function Loader({size}) {
  size = size || 60;

  return <div className={"loader"} style={{height: size, width: size}} />
}