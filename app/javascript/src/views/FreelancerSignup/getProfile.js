import gql from "graphql-tag";

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
    accountStatus
    country {
      id
    }
    invitations: applications(status: ["Invited To Apply"]) {
      id
      project {
        id
        primarySkill
        estimatedBudget
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
