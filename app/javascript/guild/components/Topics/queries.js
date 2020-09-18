import { gql } from "@apollo/client";

export const GUILD_TOP_TOPICS_QUERY = gql`
  query guildTopTopics {
    guildTopTopics(first: 20) {
      nodes {
        id
        name
      }
    }
  }
`;
