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
    commented
    commentsCount
    engagementsCount
    authored
    createdAtTimeAgo
    coverImage
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
