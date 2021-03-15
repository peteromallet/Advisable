import { gql } from "@apollo/client";

export default gql`
  fragment EventFields on Event {
    id
    title
    description
    startsAt
    endsAt
    createdAt
    attending
    attendeesCount
    coverPhotoUrl
    color
    host {
      id
      name
      avatar
      location
      bio
    }
  }
`;
