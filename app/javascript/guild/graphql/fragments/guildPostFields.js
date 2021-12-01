import { gql } from "@apollo/client";

export default gql`
  fragment GuildPostFields on PostInterface {
    id
    type
    title
    body
    excerpt
    status
    engaged
    engagementsCount
    authored
    createdAtTimeAgo
    denormalizedType
    audienceType
    shareable
    pinned
    resolved
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
    guildTopics: labels {
      id
      name
      slug
    }
    ... on GuildPostCaseStudy {
      article {
        id
      }
    }
  }
`;
