import React from "react";
import { GUILD_FEATURED_MEMBERS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { Box, Text } from "@advisable/donut";
import Loading from "./Loading";
import FeaturedMembersList from "./FeaturedMembersList";

const FeaturedMembers = () => {
  const { data, loading, error } = useQuery(GUILD_FEATURED_MEMBERS_QUERY);
  const members = data?.guildFeaturedMembers;

  if (error) return null;

  return (
    <Box pb="12">
      <Text
        fontSize="xs"
        marginBottom="6"
        color="neutral600"
        fontWeight="medium"
        textTransform="uppercase"
      >
        Featured Members
      </Text>

      {loading ? <Loading /> : null}
      {!loading && data ? <FeaturedMembersList members={members} /> : null}
    </Box>
  );
};

export default React.memo(FeaturedMembers);
