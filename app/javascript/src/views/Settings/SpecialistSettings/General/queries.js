import { gql, useMutation } from "@apollo/client";

const fields = gql`
  fragment SpecialistFields on Specialist {
    id
    name
    remote
    email
    firstName
    lastName
    hourlyRate
    publicUse
    collaborationTypes
  }
`;

export const GET_DATA = gql`
  ${fields}

  query getData {
    viewer {
      ... on Specialist {
        ...SpecialistFields
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  ${fields}
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;

export function useUpdateProfile() {
  return useMutation(UPDATE_PROFILE);
}
