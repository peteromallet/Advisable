import { gql } from "@apollo/client";

export const GUILD_LAST_READ_QUERY = gql`
  {
    viewer {
      ... on Specialist {
        guildUnreadMessages
        guildUnreadNotifications
      }
    }
  }
`;
