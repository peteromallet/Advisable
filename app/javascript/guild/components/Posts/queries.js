import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildPosts(
    $cursor: String
    $type: String
    $withPopularPosts: Boolean = true
  ) {
    guildPopularPosts @include(if: $withPopularPosts) {
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
    guildPosts(first: 10, after: $cursor, type: $type) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...GuildPostFields
          author {
            location
            id
            bio
            firstName
          }
        }
      }
    }
  }
`;
