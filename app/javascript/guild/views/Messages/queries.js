import { gql } from "@apollo/client";

export const CHAT_PARTICIPANT_QUERY = gql`
  query specialist($id: ID!) {
    specialist(id: $id) {
      avatar
      firstName
      lastName
      name
    }
  }
`;
