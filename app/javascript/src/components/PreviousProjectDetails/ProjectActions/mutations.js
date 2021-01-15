import { gql } from "@apollo/client";

export const DELETE_PREVIOUS_PROJECT = gql`
  mutation DeletePreviousProject($input: DeletePreviousProjectInput!) {
    deletePreviousProject(input: $input) {
      success
    }
  }
`;
