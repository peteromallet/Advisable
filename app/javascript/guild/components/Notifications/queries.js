import { gql } from "@apollo/client";

export const GUILD_NOTIFICATIONS_QUERY = gql`
  query guildNotifications {
    guildNotifications(first: 20) {
      nodes {
        __typename
        id
        createdAt
        ... on SuggestedPostNotification {
          specialist {
            id
            name
          }
          guildPost {
            id
            title
          }
        }
        ... on PostReactionNotification {
          specialist {
            id
            name
          }
          guildPost {
            id
            title
          }
        }
      }
    }
  }
`;
