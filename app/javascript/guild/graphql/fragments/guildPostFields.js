import { gql } from "@apollo/client";

export default gql`
  fragment GuildPostFields on PostInterface {
    id
    type
    title
    body
    excerpt
    reacted
    reactionsCount
    status
    engaged
    engagementsCount
    authored
    createdAtTimeAgo
    denormalizedType
    audienceType
    shareable
    images {
      id
      url
      cover
      position
    }
    coverImage {
      id
      url
    }
    author {
      id
      name
      avatar
    }
    guildTopics {
      id
      name
    }
  }
`;
