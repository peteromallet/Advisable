import { gql } from "@apollo/client";

export const GUILD_FEATURED_MEMBERS_QUERY = gql`
  query guildFeaturedMembers {
    guildFeaturedMembers {
      id
      name
      location
      guildJoinedTimeAgo
      avatar
    }
  }
`;
