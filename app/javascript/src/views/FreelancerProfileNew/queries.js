import { gql } from "@apollo/client";

const fields = gql`
  fragment SpecialistFields on Specialist {
    id
    name
    firstName
    avatar
    location
    bio
    linkedin
    website

    projectSkills {
      nodes {
        id
        name
      }
    }

    industries {
      id
      name
    }

    ratings {
      overall
    }

    profileProjects {
      id
      title
      clientName
      coverPhoto {
        url
      }
      excerpt
      primaryIndustry {
        id
        name
        color
      }
      skills {
        id
        name
      }
      industries {
        id
        name
      }
      reviews {
        id
        name
        role
        comment
        companyName
      }
    }

    reviews {
      id
      name
      role
      comment
      companyName
      avatar
    }
  }
`;

export const GET_PROFILE = gql`
  ${fields}
  query getProfileData($id: ID!) {
    specialist(id: $id) {
      ...SpecialistFields
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
