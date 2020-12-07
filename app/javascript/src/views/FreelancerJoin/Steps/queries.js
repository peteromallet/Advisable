import { gql, useMutation } from "@apollo/client";
import { viewerFields } from "src/graphql/queries/viewer";

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      industry
      estimatedBudget
      specialistDescription
      skills {
        name
      }
      primarySkill {
        name
      }
      user {
        city
        country {
          name
        }
        companyName
      }
      remote
      goals
    }
  }
`;

export const CREATE_FREELANCER_ACCOUNT = gql`
  ${viewerFields}

  mutation CreateFreelancerAccount($input: CreateFreelancerAccountInput!) {
    createFreelancerAccount(input: $input) {
      viewer {
        ...ViewerFields
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  ${viewerFields}

  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      viewer {
        ...ViewerFields
      }
    }
  }
`;

export function useUpdatePassword(opts) {
  return useMutation(UPDATE_PASSWORD, opts);
}
