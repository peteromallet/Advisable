import React from "react";
import Divider from "../../components/Divider";
import { Box } from "@advisable/donut";
import Skeleton from "../../components/Skeleton";
import SkeletonHeading from "../../components/SkeletonHeading";
import { Cards } from "./styles";

export default function LoadingActiveTalent() {
  return (
    <>
      <SkeletonHeading />
      <Box paddingY="xl">
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
