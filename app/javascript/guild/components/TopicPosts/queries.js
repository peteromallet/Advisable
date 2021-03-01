import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_TOPIC_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildTopicPosts($cursor: String, $topicId: ID!) {
    guildTopicPosts(first: 10, after: $cursor, topicId: $topicId) {
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
