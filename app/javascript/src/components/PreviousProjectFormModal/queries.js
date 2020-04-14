import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const previousProjectFields = gql`
  fragment PreviousProjectFields on PreviousProject {
    id
    draft
    companyName
    companyType
    confidential
    description
    goal
    contactName
    contactJobTitle
    contactRelationship
    primaryIndustry {
      id
      name
    }
    industries {
      id
      name
    }
    primarySkill {
      id
      name
    }
    skills {
      id
      name
    }
  }
`;

export const CREATE_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  mutation createPreviousProject($input: CreatePreviousProjectInput!) {
    createPreviousProject(input: $input) {
      previousProject {
        ...PreviousProjectFields
      }
    }
  }
`;

export const UPDATE_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  mutation updatePreviousProject($input: UpdatePreviousProjectInput!) {
    updatePreviousProject(input: $input) {
      previousProject {
        ...PreviousProjectFields
      }
    }
  }
`;

export const useUpdatePreviousProject = () =>
  useMutation(UPDATE_PREVIOUS_PROJECT);

export const GET_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  query getPreviousProject($id: ID!) {
    previousProject(id: $id) {
      ...PreviousProjectFields
    }
  }
`;
