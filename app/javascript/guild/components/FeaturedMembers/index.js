import React from "react";
import { GUILD_FEATURED_MEMBERS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { Text } from "@advisable/donut";
import Loading from "./Loading";
import FeaturedMembersList from "./FeaturedMembersList";

const FeaturedMembers = () => {
  const { data, loading, error } = useQuery(GUILD_FEATURED_MEMBERS_QUERY);
  const members = data?.guildFeaturedMembers;

  if (error) return null;

  return (
    <>
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
    </>
  );
};

export default React.memo(FeaturedMembers);
