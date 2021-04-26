import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const SIDEBAR_QUERY = gql`
  ${GuildPostFields}
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
      label {
        id
        name
        slug
        guildPosts(first: 5) {
          edges {
            node {
              ...GuildPostFields
              author {
                id
                firstName
              }
            }
          }
        }
      }
    }
  }
`;
