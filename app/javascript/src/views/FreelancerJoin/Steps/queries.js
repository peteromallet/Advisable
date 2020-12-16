import { gql, useMutation } from "@apollo/client";
import { viewerFields } from "src/graphql/queries/viewer";
import VIEWER from "src/graphql/queries/viewer";

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

export const useCreateFreelancerAccount = () =>
  useMutation(CREATE_FREELANCER_ACCOUNT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.createFreelancerAccount.viewer,
        },
      });
    },
  });

export const UPDATE_PROFILE = gql`
  ${viewerFields}

  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        ...ViewerFields
      }
    }
  }
`;

export const useUpdateProfile = () =>
  useMutation(UPDATE_PROFILE, {
    update(cache, { data }) {
      cache.writeQuery({
        query: VIEWER,
        data: {
          viewer: data.updateProfile.specialist,
        },
      });
    },
  });

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
