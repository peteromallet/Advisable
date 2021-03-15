import { gql } from "@apollo/client";

export default gql`
  fragment GuildEventFields on GuildEventType {
    id
    title
    description
    startsAt
    endsAt
    createdAt
    attending
    attendeesCount
    coverPhotoUrl
    host {
      id
      name
      avatar
      location
      bio
    }
  }
`;
