import { gql } from "@apollo/client";

export const GUILD_NEW_MEMBERS_QUERY = gql`
  query guildNewMembers {
    guildNewMembers {
      id
      name
      location
      guildJoinedTimeAgo
      avatar
    }
  }
`;
