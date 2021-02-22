import { gql } from "@apollo/client";
import GuildEventFields from "@guild/graphql/fragments/guildEventFields";

export const GUILD_EVENTS_QUERY = gql`
  ${GuildEventFields}

  query guildEvents($cursor: String) {
    guildEvents(first: 7, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...GuildEventFields
          attendees(first: 6) {
            edges {
              node {
                id
                firstName
                avatar
              }
            }
          }
        }
      }
    }
  }
`;
