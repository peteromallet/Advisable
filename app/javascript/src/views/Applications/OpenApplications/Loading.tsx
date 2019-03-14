import * as React from "react";
import Padding from "../../../components/Spacing/Padding"
import SkeletonHeading from "../../../components/SkeletonHeading"
import { SkeletonApplication } from "./styles";

const Loading = () => (
  <React.Fragment>
    <Padding bottom="m">
      <SkeletonHeading />
    </Padding>
    <SkeletonApplication />
    <SkeletonApplication />
    <SkeletonApplication />
  </React.Fragment>
)

export default Loading