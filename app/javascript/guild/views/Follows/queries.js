import { gql } from "@apollo/client";

// TODO: AATO - Replace with followed_labels

export const GUILD_FOLLOWED_TOPICS = gql`
  {
    guildFollowedTopics {
      id
      name
      slug
    }
  }
`;
