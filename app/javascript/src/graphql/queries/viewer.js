import { gql } from "@apollo/client";

export const viewerFields = gql`
  fragment ViewerFields on ViewerUnion {
    ... on User {
      id
      accountId
      email
      name
      isAdmin
      isTeamManager
      airtableId
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
      accountId
      email
      name
      createdAt
      airtableId
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
