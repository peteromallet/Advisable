import { gql } from "@apollo/client";

export const GUILD_TOP_TOPICS_QUERY = gql`
  query topLabels {
    topLabels(first: 20) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GUILD_FOLLOWED_TOPICS = gql`
  query getFollowedTopics {
    followedLabels {
      id
      name
      slug
    }
  }
`;
