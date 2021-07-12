import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";
import CaseStudyFields from "@guild/graphql/fragments/caseStudyFields";

export const GUILD_TOPIC_POSTS_QUERY = gql`
  ${GuildPostFields}
  ${CaseStudyFields}
  query labelFeed($cursor: String, $topicId: ID!) {
    labelPosts(first: 10, after: $cursor, labelSlug: $topicId) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...GuildPostFields
          ...CaseStudyFields
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
