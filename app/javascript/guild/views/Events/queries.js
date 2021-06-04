import { gql } from "@apollo/client";
import EventFields from "@guild/graphql/fragments/eventFields";

export const EVENTS_QUERY = gql`
  ${EventFields}

  query events($cursor: String) {
    events(first: 7, after: $cursor) {
      upcomingEventsCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...EventFields
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
