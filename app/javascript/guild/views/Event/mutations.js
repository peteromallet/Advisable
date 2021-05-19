import { gql } from "@apollo/client";
import EventFields from "@guild/graphql/fragments/eventFields";

const AttendeesDetailsFields = gql`
  fragment AttendeesDetailsFields on SpecialistConnection {
    edges {
      node {
        id
        firstName
        avatar
      }
    }
  }
`;

export const UPDATE_EVENT_REGISTRATION = gql`
  ${EventFields}
  ${AttendeesDetailsFields}
  mutation updateEventRegistration($input: UpdateEventRegistrationInput!) {
    updateEventRegistration(input: $input) {
      event {
        ...EventFields
        attendees(first: 100) {
          ...AttendeesDetailsFields
        }
      }
    }
  }
`;
