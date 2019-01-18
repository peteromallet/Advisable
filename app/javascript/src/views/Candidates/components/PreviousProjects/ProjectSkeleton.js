import React from "react";
import SkeletonText from "src/components/SkeletonText";
import SkeletonHeading from "src/components/SkeletonHeading";
import { PreviousProject } from "./styles";

export default () => {
  return (
    <PreviousProject>
      <SkeletonHeading />
      <SkeletonText />
    </PreviousProject>
  )
}