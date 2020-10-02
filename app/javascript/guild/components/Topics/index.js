import React from "react";
import { useQuery } from "@apollo/client";
import { Text } from "@advisable/donut";
import { GUILD_TOP_TOPICS_QUERY } from "./queries";
import { GuildBox } from "@guild/styles";
import { useToggle } from "@guild/hooks/useToggle";
import Loading from "@advisable-main/components/Loading";
import ShowMore from "@guild/components/ShowMore";
import Topic from "./components/Topic";

const Topics = () => {
  const { data, loading } = useQuery(GUILD_TOP_TOPICS_QUERY);
  const [moreTopics, toggleMoreTopics] = useToggle();

  if (loading) return <Loading />;

  return (
    <GuildBox
      padding="l"
      backgroundColor="aliceBlue100"
      spaceChildrenVertical={24}
      flexShrink={1}
      alignSelf="flex-start"
      overflow="hidden"
      width="275px"
    >
      <Text fontSize="xxl" fontWeight="medium" color="catalinaBlue100">
        Topics
      </Text>
      <ShowMore showingMore={moreTopics} onToggle={toggleMoreTopics} />

      <GuildBox spaceChildrenVertical={20}>
        {data?.guildTopTopics?.nodes?.map(
          (topic, key) =>
            (moreTopics || key < data?.guildTopTopics?.nodes?.length / 2.5) && (
              <Topic key={key} topic={topic} />
            ),
        )}
      </GuildBox>
    </GuildBox>
  );
};

export default React.memo(Topics);
