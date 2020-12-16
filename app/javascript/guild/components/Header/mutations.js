import { gql } from "@apollo/client";

export const GUILD_UPDATE_LAST_READ = gql`
  mutation guildUpdateLastRead($input: GuildUpdateLastReadInput!) {
    guildUpdateLastRead(input: $input) {
      viewer {
        ... on Specialist {
          guildUnreadNotifications
        }
      }
    }
  }
`;
