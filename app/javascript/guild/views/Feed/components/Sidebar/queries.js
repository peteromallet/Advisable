import { gql } from "@apollo/client";

export const SIDEBAR_QUERY = gql`
  query sidebar {
    guildFeaturedMembers {
      id
      avatar
      name
      firstName
    }
  }
`;
