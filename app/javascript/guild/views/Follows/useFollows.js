import { useQuery, useMutation } from "@apollo/client";
import { GUILD_FOLLOWED_TOPICS } from "./queries";
import { FOLLOW_GUILD_TOPIC, UNFOLLOW_GUILD_TOPIC } from "./mutations";

const useFollows = () => {
  const { data: followedTopicsData, loading: followedTopicsLoading } = useQuery(
    GUILD_FOLLOWED_TOPICS,
    {
      fetchPolicy: "cache-first",
    },
  );
  const followedTopics = followedTopicsData?.guildFollowedTopics;

  const [unfollow] = useMutation(UNFOLLOW_GUILD_TOPIC, {
    update(cache, { data }) {
      const existing = cache.readQuery({ query: GUILD_FOLLOWED_TOPICS });
      const removed = data?.unfollowGuildTopic?.guildTopic;
      cache.writeQuery({
        query: GUILD_FOLLOWED_TOPICS,
        data: {
          guildFollowedTopics: existing?.guildFollowedTopics.filter(
            (t) => t.id !== removed.id,
          ),
        },
      });
    },
  });

  const [follow] = useMutation(FOLLOW_GUILD_TOPIC, {
    update(cache, { data }) {
      const existing = cache.readQuery({ query: GUILD_FOLLOWED_TOPICS });
      const added = data?.followGuildTopic?.guildTopic;
      cache.writeQuery({
        query: GUILD_FOLLOWED_TOPICS,
        data: {
          guildFollowedTopics: [...existing?.guildFollowedTopics, added],
        },
      });
    },
  });

  const unfollowTopic = async (guildTopicId) => {
    await unfollow({ variables: { input: { guildTopicId } } });
  };
  const followTopic = async (guildTopicId) => {
    await follow({ variables: { input: { guildTopicId } } });
  };

  return {
    unfollowTopic,
    followTopic,
    followedTopics,
    followedTopicsLoading,
  };
};

export default useFollows;
