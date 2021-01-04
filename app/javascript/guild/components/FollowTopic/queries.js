import { gql } from "@apollo/client";

export const GUILD_TOPIC_QUERY = gql`
  query guildTopic($id: ID!) {
    guildTopic(id: $id) {
      id
      name
    }
  }
`;
