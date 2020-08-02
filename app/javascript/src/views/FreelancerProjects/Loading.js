import React from "react";
import { Box } from "@advisable/donut";
import Divider from "../../components/Divider";
import Skeleton from "../../components/Skeleton";
import SkeletonHeading from "../../components/SkeletonHeading";
import { Cards } from "./styles";

export default function Loading() {
  return (
    <>
      <SkeletonHeading />
      <Box paddingBottom="xl" paddingTop="xl">
        <Divider />
      </Box>
      <Cards>
        <Skeleton.Card />
        <Skeleton.Card />
        <Skeleton.Card />
      </Cards>
    </>
  );
}
