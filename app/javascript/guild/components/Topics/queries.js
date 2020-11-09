import { gql } from "@apollo/client";

export const GUILD_TOP_TOPICS_QUERY = gql`
  query guildTopTopics {
    guildTopTopics(first: 20) {
      nodes {
        id
        name
        topicable {
          __typename
          ... on Country {
            name
          }
          ... on Skill {
            name
          }
          ... on Industry {
            name
          }
        }
      }
    }
  }
`;
