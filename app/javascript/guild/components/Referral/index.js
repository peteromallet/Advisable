import React from "react";
import { Text } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import { GuildBox } from "@guild/styles";
import CopyLink from "./components/CopyLink";

const Referral = () => {
  const viewer = useViewer();
  const link = encodeURI(
    `https://advisable.com/guild/refer/?referrer=${viewer.name}&id=${viewer.id}`,
  );

  return (
    <GuildBox
      spaceChildrenVertical={8}
      backgroundColor="#E8E8F3"
      borderRadius="12px"
      padding="m"
    >
      <Text lineHeight="s" fontWeight="medium" color="blue900">
        Know someone that should be a member of the Guild?
      </Text>
      <Text lineHeight="s" color="neutral700" fontWeight="regular" size="xs">
        Share your personal referral link with them to apply
      </Text>
      <CopyLink link={link} />
    </GuildBox>
  );
};

export default Referral;
