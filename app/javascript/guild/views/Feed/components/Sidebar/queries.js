import { gql } from "@apollo/client";

export const SIDEBAR_QUERY = gql`
  query sidebar {
    guildFeaturedMembers {
      id
      avatar
      name
      firstName
    }
    latestPrompt {
      id
      prompt
      cta
      description
      posts {
        id
        title
        author {
          id
          name
          avatar
        }
      }
      label {
        id
        name
        slug
      }
    }
  }
`;
