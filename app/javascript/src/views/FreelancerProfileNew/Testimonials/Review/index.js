import React from "react";
import { useBreakpoint } from "@advisable/donut";
import Wide from "./Wide";
import Mobile from "./Mobile";
import Tablet from "./Tablet";

function Review(props) {
  const isMobile = useBreakpoint("s");
  const isTablet = useBreakpoint("m");
  if (isMobile) return <Mobile {...props} />;
  if (isTablet) return <Tablet {...props} />;

  return <Wide {...props} />;
}

export default Review;
