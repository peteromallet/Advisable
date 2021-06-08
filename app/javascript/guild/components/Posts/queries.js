import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";
import CaseStudyFields from "@guild/graphql/fragments/caseStudyFields";

export const GUILD_POSTS_QUERY = gql`
  ${GuildPostFields}
  ${CaseStudyFields}
  query guildPosts(
    $cursor: String
    $type: String
    $withPopularPosts: Boolean = true
  ) {
    guildPopularPosts @include(if: $withPopularPosts) {
      ...GuildPostFields
      ...CaseStudyFields
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
