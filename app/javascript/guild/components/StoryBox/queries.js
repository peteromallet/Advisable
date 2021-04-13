import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const STORY_BOX_QUERY = gql`
  ${GuildPostFields}
  query storyBox {
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
