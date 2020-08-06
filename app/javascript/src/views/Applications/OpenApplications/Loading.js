import * as React from "react";
import { Box } from "@advisable/donut";
import SkeletonHeading from "../../../components/SkeletonHeading";
import { SkeletonApplication } from "./styles";

const Loading = () => (
  <React.Fragment>
    <Box paddingBottom="m">
      <SkeletonHeading />
    </Box>
    <SkeletonApplication />
    <SkeletonApplication />
    <SkeletonApplication />
  </React.Fragment>
);

export default Loading;
