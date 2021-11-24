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
    url
    host {
      id
      name
      avatar
      location
      profilePath
      bio
    }
  }
`;
