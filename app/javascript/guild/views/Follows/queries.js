import { gql } from "@apollo/client";

export const GUILD_FOLLOWED_TOPICS = gql`
  query getFollowedTopics {
    followedLabels {
      id
      name
      slug
    }
  }
`;
