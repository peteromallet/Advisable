import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildPosts($cursor: String, $type: String, $topicId: ID) {
    guildPosts(first: 10, after: $cursor, type: $type, topicId: $topicId) {
      guildTopic {
        id
        name
      }
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
