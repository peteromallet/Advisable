import { gql, useMutation } from "@apollo/client";
import VIEWER from "src/graphql/queries/getViewer.graphql";
import CREATE_FREELANCER_ACCOUNT from "./createFreelancerAccount.gql";
import UPDATE_PROFILE from "./updateProfile.gql";
import UPDATE_PASSWORD from "./updatePassword.gql";

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
        location
        companyName
      }
      remote
      goals
    }
  }
`;

export const useCreateFreelancerAccount = () =>
  useMutation(CREATE_FREELANCER_ACCOUNT, {
    update(cache, { data, errors }) {
      if (!errors) {
        cache.writeQuery({
          query: VIEWER,
          data: {
            viewer: data.createFreelancerAccount.viewer,
          },
        });
      }
    },
  });

export const useUpdateProfile = () =>
  useMutation(UPDATE_PROFILE, {
    update(cache, { data, errors }) {
      if (!errors) {
        cache.writeQuery({
          query: VIEWER,
          data: {
            viewer: data.updateProfile.specialist,
          },
        });
      }
    },
  });

export function useUpdatePassword() {
  return useMutation(UPDATE_PASSWORD, {
    update(cache, { data }) {
      cache.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.updatePassword.viewer,
        },
      });
    },
  });
}
