import React from "react";
import Compact from "./Compact";
import Wide from "./Wide";
import { useBreakpoint } from "@advisable/donut";

function Info(props) {
  const isWide = useBreakpoint("mUp");
  if (isWide) return <Wide {...props} />;
  return <Compact {...props} />;
}

export default Info;
