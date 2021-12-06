import { gql } from "@apollo/client";

export const GUILD_TOP_TOPICS_QUERY = gql`
  query topLabels {
    topLabels(first: 20) {
      nodes {
        id
        name
        slug
        value: name
        label: name
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
      value: name
      label: name
    }
  }
`;

export const SEARCH_LABELS = gql`
  query SearchLabels($name: String!) {
    searchLabels(name: $name) {
      id
      name
      slug
      value: name
      label: name
    }
  }
`;
