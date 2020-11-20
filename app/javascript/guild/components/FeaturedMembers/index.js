import React from "react";
import { GUILD_FEATURED_MEMBERS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { Box, Text, Stack } from "@advisable/donut";
import { useToggle } from "@guild/hooks/useToggle";
import Loading from "@advisable-main/components/Loading";
import ShowMore from "@guild/components/ShowMore";
import FeaturedMember from "./components/FeaturedMember";

const FeaturedMembers = () => {
  const { data, loading } = useQuery(GUILD_FEATURED_MEMBERS_QUERY);
  const [moreFeaturedMembers, toggleMoreFeaturedMembers] = useToggle();

  if (loading) return <Loading />;

  return (
    <Box flexShrink={1} alignSelf="flex-start">
      <Text
        fontSize="xs"
        marginBottom="4"
        color="neutral600"
        fontWeight="medium"
        textTransform="uppercase"
      >
        Featured Members
      </Text>

      <Stack spacing="lg" marginBottom="lg">
        {data?.guildFeaturedMembers?.map(
          (member, key) =>
            (moreFeaturedMembers ||
              key < data?.guildFeaturedMembers?.length / 2) && (
              <FeaturedMember key={key} featuredMember={member} />
            ),
        )}
      </Stack>

      <ShowMore
        showingMore={moreFeaturedMembers}
        onToggle={toggleMoreFeaturedMembers}
      />
    </Box>
  );
};

export default React.memo(FeaturedMembers);
