import { gql, useQuery } from "@apollo/client";

export const GET_SPECIALIST = gql`
  query Specialist($id: ID!) {
    specialist(id: $id) {
      id
      # Introduction step
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
      # ...
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
      # ...
    }
  }
`;

export const useGetSpecialist = (id) => {
  const response = useQuery(GET_SPECIALIST, { variables: { id } });
  return response;
};

export const UPDATE_INTRODUCTION = gql`
  mutation UpdateIntroduction($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        id
        avatar
        bio
        city
        country {
          id
          name
        }
        publicUse
      }
    }
  }
`;

export const UPDATE_OVERVIEW = gql`
  mutation UpdateIntroduction($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        id
        linkedin
        website
        resume {
          id
          filename
          url
        }
      }
    }
  }
`;

export const UPDATE_WORK_PREFERENCES = gql`
  mutation UpdateWorkPreferences($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        id
        skills {
          value: id
          label: name
        }
        industries {
          value: id
          label: name
        }
        primarilyFreelance
      }
    }
  }
`;

export const COMPLETE_SETUP = gql`
  mutation CompleteSetup($input: CompleteSetupInput!) {
    completeSetup(input: $input) {
      specialist {
        id
      }
    }
  }
`;
