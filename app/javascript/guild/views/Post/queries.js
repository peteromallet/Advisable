import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POST_QUERY = gql`
  ${GuildPostFields}
  query guildPost($id: ID!, $includePostPrompt: Boolean = false) {
    guildPost(id: $id) {
      ...GuildPostFields
      postPrompt @include(if: $includePostPrompt) {
        id
        label {
          id
          name
          slug
        }
      }
      author {
        location
        id
        bio
        firstName
        name
      }
    }
  }
`;
