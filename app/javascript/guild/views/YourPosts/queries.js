import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_YOUR_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildYourPosts($cursor: String) {
    guildYourPosts(first: 10, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ...GuildPostFields
        ... on GuildPostAdviceRequired {
          needHelp
        }
        author {
          location
          id
          bio
          firstName
        }
      }
    }
  }
`;
