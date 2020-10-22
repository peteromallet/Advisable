import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POSTS_QUERY = gql`
  ${GuildPostFields}
  query guildPosts(
    $cursor: String
    $selectedFilter: String
    $selectedTopicsIds: [ID!]
  ) {
    guildPosts(
      first: 10
      after: $cursor
      type: $selectedFilter
      topicIds: $selectedTopicsIds
    ) {
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
