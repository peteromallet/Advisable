import * as React from "react";
import Padding from "../../../components/Spacing/Padding"
import SkeletonHeading from "../../../components/SkeletonHeading"
import { InvitationsWrapper, Invitations, LoadingTile } from "./styles";

const Loading = () => (
  <React.Fragment>
      <Padding bottom="xs">
        <SkeletonHeading />
      </Padding>
      <InvitationsWrapper>
        <Invitations>
          <LoadingTile />
        </Invitations>
      </InvitationsWrapper>
    </React.Fragment>
)

export default Loading