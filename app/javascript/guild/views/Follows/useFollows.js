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
  const followedTopics = followedTopicsData?.followedLabels;

  const [unfollow] = useMutation(UNFOLLOW_GUILD_TOPIC, {
    update(cache, { data }) {
      const existing = cache.readQuery({ query: GUILD_FOLLOWED_TOPICS });
      const removed = data?.unfollowLabel?.label;
      cache.writeQuery({
        query: GUILD_FOLLOWED_TOPICS,
        data: {
          followedLabels: existing?.followedLabels.filter(
            (t) => t.id !== removed.id,
          ),
        },
      });
    },
  });

  const [follow] = useMutation(FOLLOW_GUILD_TOPIC, {
    update(cache, { data }) {
      const existing = cache.readQuery({ query: GUILD_FOLLOWED_TOPICS });
      const added = data?.followLabel?.label;
      cache.writeQuery({
        query: GUILD_FOLLOWED_TOPICS,
        data: {
          followedLabels: [...existing.followedLabels, added],
        },
      });
    },
  });

  const unfollowTopic = async (labelSlug) => {
    await unfollow({ variables: { input: { labelSlug } } });
  };
  const followTopic = async (labelSlug) => {
    await follow({ variables: { input: { labelSlug } } });
  };

  return {
    unfollowTopic,
    followTopic,
    followedTopics,
    followedTopicsLoading,
  };
};

export default useFollows;
