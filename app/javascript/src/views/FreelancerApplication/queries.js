import { gql, useQuery } from "@apollo/client";

const specialistFields = gql`
  fragment SpecialistFields on Specialist {
    id
    # Introduction step
    name
    avatar
    bio
    city
    country {
      id
      name
    }
    publicUse
    # Overview step
    linkedin
    website
    resume {
      id
      filename
      url
    }
    # Previous work step
    previousWorkDescription
    previousWorkResults
    # Work preferences step
    skills {
      value: id
      label: name
    }
    industries {
      value: id
      label: name
    }
    primarilyFreelance
    # Ideal project step
    idealProject
    applicationStage
  }
`;

export const GET_SPECIALIST = gql`
  ${specialistFields}
  query Specialist($id: ID!) {
    countries {
      id
      name
      __typename
    }
    skills {
      value: id
      label: name
    }
    industries {
      value: id
      label: name
    }
    specialist(id: $id) {
      ...SpecialistFields
    }
  }
`;

export const useGetSpecialist = (id) => {
  const response = useQuery(GET_SPECIALIST, { variables: { id } });
  return response;
};

export const UPDATE_PROFILE = gql`
  ${specialistFields}
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;

export const COMPLETE_SETUP = gql`
  ${specialistFields}
  mutation CompleteSetup($input: CompleteSetupInput!) {
    completeSetup(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;
