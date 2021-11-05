import { gql } from "@apollo/client";

const fields = gql`
  fragment ProjectFields on Project {
    id
    name
    applicationsOpen
    description
    companyDescription
    goals
    industry
    companyType
    requiredCharacteristics
    optionalCharacteristics
    estimatedBudget
    remote
    primarySkill {
      id
      name
    }
    user {
      id
      country {
        id
        name
      }
    }
  }
`;

export const GET_PROJECT = gql`
  ${fields}
  query GetProject($id: ID!) {
    project(id: $id) {
      ...ProjectFields
    }
  }
`;
