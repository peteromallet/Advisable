import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";

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

export const CREATE_USER_FROM_LINKEDIN = gql`
  mutation createUserFromLinkedin($input: CreateUserFromLinkedinInput!) {
    createUserFromLinkedin(input: $input) {
      user {
        id
      }
    }
  }
`;

export function useCreateUserFromLinkedin() {
  return useMutation(CREATE_USER_FROM_LINKEDIN);
}
