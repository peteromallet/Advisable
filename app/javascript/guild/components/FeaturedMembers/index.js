import React from "react";
import { GUILD_FEATURED_MEMBERS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { Text, Stack } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { useToggle } from "@guild/hooks/useToggle";
import Loading from "@advisable-main/components/Loading";
import ShowMore from "@guild/components/ShowMore";
import FeaturedMember from "./components/FeaturedMember";

const FeaturedMembers = () => {
  const { data, loading } = useQuery(GUILD_FEATURED_MEMBERS_QUERY);
  const [moreFeaturedMembers, toggleMoreFeaturedMembers] = useToggle();

  if (loading) return <Loading />;

  return (
    <GuildBox flexShrink={1} alignSelf="flex-start">
      <Text
        fontSize="xl"
        marginBottom="lg"
        fontWeight="medium"
        color="catalinaBlue100"
        letterSpacing="-0.02em"
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
    </GuildBox>
  );
};

export default React.memo(FeaturedMembers);
