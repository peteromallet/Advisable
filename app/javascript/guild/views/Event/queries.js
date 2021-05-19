import { gql } from "@apollo/client";
import EventFields from "@guild/graphql/fragments/eventFields";

export const EVENT_QUERY = gql`
  ${EventFields}
  query event($id: ID!) {
    event(id: $id) {
      ...EventFields
      attendees(first: 100) {
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
`;
