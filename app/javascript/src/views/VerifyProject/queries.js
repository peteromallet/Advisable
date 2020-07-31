import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

const previousProjectFields = gql`
  fragment PreviousProjectFields on PreviousProject {
    id
    title
    excerpt
    description
    validationStatus
    contactName
    companyType
    primarySkill {
      id
      name
    }
    primaryIndustry {
      id
      name
    }
    specialist {
      id
      name
      avatar
      location
      firstName
    }
    reviews {
      id
    }
    similarSpecialists {
      id
      name
      avatar
      location
      ratings {
        overall
      }
    }
  }
`;

export const GET_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  query getPreviousProject($id: ID!) {
    oauthViewer {
      name
      image
      firstName
      canValidateProject(id: $id)
    }
    previousProject(id: $id) {
      ...PreviousProjectFields
    }
  }
`;

export function usePreviousProject() {
  const { id } = useParams();
  return useQuery(GET_PREVIOUS_PROJECT, {
    variables: { id },
  });
}

export const VALIDATE_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  mutation validate($input: VerifyPreviousProjectInput!) {
    verifyPreviousProject(input: $input) {
      previousProject {
        ...PreviousProjectFields
      }
    }
  }
`;

export function useValidatePreviousProject() {
  return useMutation(VALIDATE_PREVIOUS_PROJECT);
}

export const REVIEW_PREVIOUS_PROJECT = gql`
  mutation reviewPreviousProject($input: ReviewPreviousProjectInput!) {
    reviewPreviousProject(input: $input) {
      review {
        id
      }
    }
  }
`;

export function useReviewPreviousProject() {
  return useMutation(REVIEW_PREVIOUS_PROJECT);
}

export const FAIL_PREVIOUS_PROJECT_VALIDATION = gql`
  ${previousProjectFields}

  mutation failPreviousProjectVerification(
    $input: FailPreviousProjectVerificationInput!
  ) {
    failPreviousProjectVerification(input: $input) {
      previousProject {
        ...PreviousProjectFields
      }
    }
  }
`;

export function useFailPreviousProjectValidation() {
  return useMutation(FAIL_PREVIOUS_PROJECT_VALIDATION);
}

export const CREATE_USER_FROM_PROJECT_VERIFICATION = gql`
  mutation createUserFromProjectVerification(
    $input: CreateUserFromProjectVerificationInput!
  ) {
    createUserFromProjectVerification(input: $input) {
      user {
        id
        firstName
        lastName
        companyName
        companyType
        industry {
          id
          name
        }
      }
    }
  }
`;

export function useCreateUserFromProjectVerification() {
  return useMutation(CREATE_USER_FROM_PROJECT_VERIFICATION);
}
