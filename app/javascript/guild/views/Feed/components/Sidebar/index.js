import React from "react";
import { useQuery } from "@apollo/client";
import Sticky from "react-stickynode";
import { Box } from "@advisable/donut";
import useFeatureFlag from "src/hooks/useFeatureFlag";
import { SIDEBAR_QUERY } from "./queries";
import Referral from "@guild/components/Referral";
import FeaturedMembers from "@guild/components/FeaturedMembers";
import SuggestedConnection from "@guild/components/SuggestedConnection";

export default function Sidebar() {
  const includeRecommendation = useFeatureFlag("guild_recommendations");
  const { data, loading } = useQuery(SIDEBAR_QUERY, {
    variables: { includeRecommendation },
  });
  const featuredMembers = data?.guildFeaturedMembers;
  const specialistRecommendation = data?.specialistRecommendation;

  return (
    <Box width="260px" flexShrink="0">
      <Sticky top={98} enabled>
        <SuggestedConnection
          loading={loading}
          specialistRecommendation={specialistRecommendation}
        />
        <FeaturedMembers loading={loading} featuredMembers={featuredMembers} />
        <Referral />
      </Sticky>
    </Box>
  );
}
