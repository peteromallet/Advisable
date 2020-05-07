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
    primarySkill {
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
  }
`;

export const GET_PREVIOUS_PROJECT = gql`
  ${previousProjectFields}

  query getPreviousProject($id: ID!) {
    oauthViewer {
      name
      image
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
