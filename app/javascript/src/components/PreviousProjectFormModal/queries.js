import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const SELECT_DATA = gql`
  {
    industries {
      id
      label: name
      value: name
    }
    skills(local: true) {
      id
      label: name
      value: name
    }
  }
`;

const previousProjectFields = gql`
  fragment PreviousProjectFields on PreviousProject {
    id
    draft
    title
    excerpt
    clientName
    companyType
    confidential
    description
    pendingDescription
    goal
    publicUse
    contactName
    contactJobTitle
    contactFirstName
    contactLastName
    contactRelationship
    validationStatus
    costToHire
    executionCost
    industryRelevance
    locationRelevance
    images {
      id
      url
      cover
    }
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
    reviews {
      id
    }
  }
`;

export const GET_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  query getPreviousProject($id: ID!) {
    previousProject(id: $id) {
      ...PreviousProjectFields
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

export const PUBLISH_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  mutation publishPreviousProject($input: PublishPreviousProjectInput!) {
    publishPreviousProject(input: $input) {
      previousProject {
        ...PreviousProjectFields
      }
    }
  }
`;

export const usePublishPreviousProject = (props) =>
  useMutation(PUBLISH_PREVIOUS_PROJECT, props);

export const UPDATE_IMAGE = gql`
  mutation updatePhoto($input: UpdatePreviousProjectImageInput!) {
    updatePreviousProjectImage(input: $input) {
      image {
        id
        url
        cover
      }
    }
  }
`;

export const useUpdatePreviousProjectImage = (props) =>
  useMutation(UPDATE_IMAGE, props);

export const DELETE = gql`
  mutation deletePhoto($input: DeletePreviousProjectImageInput!) {
    deletePreviousProjectImage(input: $input) {
      image {
        id
        url
        cover
      }
    }
  }
`;

export const useDeletePreviousProjectImage = () => useMutation(DELETE);
