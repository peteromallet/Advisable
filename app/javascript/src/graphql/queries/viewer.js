import { gql } from "@apollo/client";

export const viewerFields = gql`
  fragment ViewerFields on ViewerUnion {
    ... on User {
      id
      email
      name
      isAdmin
      isTeamManager
      firstName
      lastName
      confirmed
      createdAt
      companyName
      talkSignature
      completedTutorials
      needsToSetAPassword
      country {
        id
        name
      }
    }
    ... on Specialist {
      id
      email
      name
      bio
      createdAt
      acceptedAt
      firstName
      lastName
      confirmed
      talkSignature
      applicationStage
      completedTutorials
      needsToSetAPassword
      avatar
      guild
      guildCalendlyLink
      image {
        url
      }
    }
  }
`;

export default gql`
  ${viewerFields}

  query viewer {
    viewer {
      ...ViewerFields
    }
  }
`;
