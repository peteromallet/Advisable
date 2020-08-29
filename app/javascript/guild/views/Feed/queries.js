import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildPosts($cursor: String) {
    guildPosts(first: 2, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ...GuildPostFields
      }
    }
  }
`;
