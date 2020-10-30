import React from "react";
import { useBreakpoint } from "@advisable/donut";
import Wide from "./Wide";
import Mobile from "./Mobile";
import Tablet from "./Tablet";

function Review(props) {
  const isWide = useBreakpoint("mUp");
  const isTablet = useBreakpoint("sUp");
  if (isWide) return <Wide {...props} />;
  if (isTablet) return <Tablet {...props} />;
  return <Mobile {...props} />;
}

export default Review;
