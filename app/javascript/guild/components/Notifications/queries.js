import { gql } from "@apollo/client";

export const GUILD_NOTIFICATIONS_QUERY = gql`
  query guildActivity {
    guildActivity(first: 20) {
      nodes {
        __typename
        ... on GuildComment {
          id
          body
          author {
            name
            avatar
          }
          createdAtTimeAgo
          post {
            title
            id
          }
        }
        ... on GuildReaction {
          id
          author {
            name
            avatar
          }
          createdAtTimeAgo
          reactionable {
            __typename
            ... on GuildPostGeneral {
              title
              id
            }
            ... on GuildComment {
              id
              post {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;
