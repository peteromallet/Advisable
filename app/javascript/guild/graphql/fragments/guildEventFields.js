import { gql } from "@apollo/client";

export default gql`
  fragment GuildEventFields on GuildEventType {
    id
    title
    excerpt
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
    guildTopics {
      id
      slug
    }
  }
`;
