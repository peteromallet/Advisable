import React from "react";
import { GUILD_NEW_MEMBERS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { Text } from "@advisable/donut";
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
    <GuildBox
      padding="l"
      backgroundColor="aliceBlue100"
      spaceChildrenVertical="24"
      flexShrink={1}
      alignSelf="flex-start"
      overflow={"hidden"}
      width={"275px"}
    >
      <Text
        fontSize="2xl"
        fontWeight="medium"
        letterSpacing="-0.01em"
        color="catalinaBlue100"
      >
        New Members
      </Text>

      <ShowMore showingMore={moreNewMembers} onToggle={toggleMoreNewMembers} />

      <GuildBox spaceChildrenVertical={24}>
        {data?.guildNewMembers?.map(
          (newMember, key) =>
            (moreNewMembers || key < data?.guildNewMembers?.length / 2) && (
              <NewMember key={key} newMember={newMember} />
            ),
        )}
      </GuildBox>
    </GuildBox>
  );
};

export default React.memo(NewMembers);
