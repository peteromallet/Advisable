import { gql } from "@apollo/client";

export const GUILD_TOPICS_FOLLOWS = gql`
  {
    viewer {
      ... on Specialist {
        guildTopicsFollows {
          id
          name
        }
      }
    }
  }
`;
