import { gql } from "@apollo/client";

export const GUILD_FOLLOWED_TOPICS = gql`
  {
    guildFollowedTopics {
      id
      name
      slug
    }
  }
`;
