import { gql } from "@apollo/client";

const fields = gql`
  fragment ProjectFields on Project {
    id
    airtableId
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

export const APPLY_FOR_PROJECT = gql`
  mutation ApplyForProject($input: ApplyForProjectInput!) {
    applyForProject(input: $input) {
      application {
        id
      }
    }
  }
`;
