import { gql } from "@apollo/client";

export const GUILD_UPDATE_LAST_READ = gql`
  mutation guildUpdateLastRead {
    guildUpdateLastRead(input: {}) {
      viewer {
        ... on Specialist {
          id
          guildUnreadNotifications
        }
      }
    }
  }
`;
