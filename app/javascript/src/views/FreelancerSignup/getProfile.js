import { gql } from "@apollo/client";

export const SpecialistFields = gql`
  fragment SpecialistFields on Specialist {
    id
    bio
    name
    city
    avatar
    website
    publicUse
    linkedin
    confirmed
    applicationStage
    country {
      id
    }
    invitations: applications(status: ["Invited To Apply"]) {
      id
      project {
        id
        estimatedBudget
        primarySkill {
          id
          name
        }
      }
    }
  }
`;

export default gql`
  ${SpecialistFields}

  {
    viewer {
      ... on Specialist {
        ...SpecialistFields
      }
    }
  }
`;
