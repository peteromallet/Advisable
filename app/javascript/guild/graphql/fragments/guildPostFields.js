import { gql } from "@apollo/client";

export default gql`
  fragment GuildPostFields on PostInterface {
    id
    title
    body
    bodyRaw
    reacted
    reactionsCount
    commented
    commentsCount
    authored
    createdAtTimeAgo
    author {
      id
      name
    }
  }
`;
