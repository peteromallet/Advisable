import React from "react";
import { useQuery } from "@apollo/client";
import Sticky from "react-stickynode";
import { Box } from "@advisable/donut";
import { SIDEBAR_QUERY } from "./queries";
import Referral from "@guild/components/Referral";
import FeaturedMembers from "@guild/components/FeaturedMembers";
import SuggestedConnection from "@guild/components/SuggestedConnection";
import StoryBox from "@guild/components/StoryBox";

export default function Sidebar() {
  const { data, loading } = useQuery(SIDEBAR_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  const featuredMembers = data?.guildFeaturedMembers;
  const latestPrompt = data?.latestPrompt;

  return (
    <Box width="260px" flexShrink="0">
      <Sticky top={98} enabled>
        <StoryBox loading={loading} latestPrompt={latestPrompt} />
        <SuggestedConnection />
        <FeaturedMembers loading={loading} featuredMembers={featuredMembers} />
        <Referral />
      </Sticky>
    </Box>
  );
}
