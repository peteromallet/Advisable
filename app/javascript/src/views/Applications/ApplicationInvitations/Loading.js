import * as React from "react";
import { Box } from "@advisable/donut";
import SkeletonHeading from "../../../components/SkeletonHeading";
import { InvitationsWrapper, Invitations, LoadingTile } from "./styles";

const Loading = () => (
  <React.Fragment>
    <Box paddingBottom="xs">
      <SkeletonHeading />
    </Box>
    <InvitationsWrapper>
      <Invitations>
        <LoadingTile />
      </Invitations>
    </InvitationsWrapper>
  </React.Fragment>
);

export default Loading;
