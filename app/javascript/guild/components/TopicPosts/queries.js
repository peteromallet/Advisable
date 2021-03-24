import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_TOPIC_POSTS_QUERY = gql`
  ${GuildPostFields}
  query labelFeed($cursor: String, $topicId: ID!) {
    labelPosts(first: 10, after: $cursor, labelSlug: $topicId) {
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
