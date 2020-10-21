import { gql } from "@apollo/client";

export default gql`
  fragment GuildPostFields on PostInterface {
    id
    type
    title
    body
    bodyRaw
    reacted
    reactionsCount
    status
    commented
    commentsCount
    engagementsCount
    authored
    createdAtTimeAgo
    denormalizedType
    audienceType
    coverImage {
      id
      url
    }
    images {
      id
      url
      cover
      position
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
