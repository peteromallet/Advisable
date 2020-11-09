import React from "react";
import { GUILD_NEW_MEMBERS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { Text, Stack } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { useToggle } from "@guild/hooks/useToggle";
import Loading from "@advisable-main/components/Loading";
import ShowMore from "@guild/components/ShowMore";
import NewMember from "./components/NewMember";

const NewMembers = () => {
  const { data, loading } = useQuery(GUILD_NEW_MEMBERS_QUERY);
  const [moreNewMembers, toggleMoreNewMembers] = useToggle();

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
        New Members
      </Text>

      <Stack spacing="lg" marginBottom="lg">
        {data?.guildNewMembers?.map(
          (newMember, key) =>
            (moreNewMembers || key < data?.guildNewMembers?.length / 2) && (
              <NewMember key={key} newMember={newMember} />
            ),
        )}
      </Stack>

      <ShowMore showingMore={moreNewMembers} onToggle={toggleMoreNewMembers} />
    </GuildBox>
  );
};

export default React.memo(NewMembers);
