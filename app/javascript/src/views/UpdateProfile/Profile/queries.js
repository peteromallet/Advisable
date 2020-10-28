import { gql } from "@apollo/client";

const fields = gql`
  fragment SpecialistFields on Specialist {
    id
    email
    bio
    name
    avatar
    skills {
      name
    }
    hourlyRate
    publicUse
  }
`;

export const GET_DATA = gql`
  ${fields}

  query getData {
    skills(local: true) {
      value: name
      label: name
    }
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
