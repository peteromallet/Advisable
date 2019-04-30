import React from "react";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";
import Skeleton from "../../components/Skeleton";
import SkeletonHeading from "../../components/SkeletonHeading";
import { Cards } from "./styles";

export default () => {
  return (
    <>
      <SkeletonHeading />
      <Padding bottom="xl" top="xl">
        <Divider />
      </Padding>
      <Cards>
        <Skeleton.Card />
        <Skeleton.Card />
        <Skeleton.Card />
      </Cards>
    </>
  )
}