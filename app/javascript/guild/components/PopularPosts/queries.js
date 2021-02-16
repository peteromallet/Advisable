import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POPULAR_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildPopularPosts {
    guildPopularPosts {
      ...GuildPostFields
      ... on PostInterface {
        author {
          id
          bio
          location
          firstName
        }
      }
    }
  }
`;
