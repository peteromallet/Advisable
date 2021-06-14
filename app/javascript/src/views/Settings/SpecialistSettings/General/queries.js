import { gql } from "@apollo/client";

const fields = gql`
  fragment SpecialistFields on Specialist {
    id
    name
    remote
    email
    firstName
    lastName
    skills {
      name
      value: name
      label: name
    }
    hourlyRate
    publicUse
  }
`;

export const GET_DATA = gql`
  ${fields}

  query getData {
    skills {
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
