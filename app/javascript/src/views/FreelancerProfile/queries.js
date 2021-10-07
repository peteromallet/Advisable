import { gql, useQuery } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

const projectFields = gql`
  fragment ProjectFields on PreviousProject {
    id
    title
    clientName
    coverPhoto {
      id
      url
    }
    excerpt
    draft
    validationStatus
    primaryIndustry {
      id
      name
      color
    }
    primarySkill {
      id
      name
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
      avatar
      role
      comment
      companyName
    }
  }
`;

const specialistFields = gql`
  fragment SpecialistFields on Specialist {
    id
    name
    firstName
    avatar
    coverPhoto
    location
    bio
    linkedin
    website
    city
    guild
    account {
      id
    }
    country {
      id
    }

    reviews {
      id
      name
      relationship
      comment
      companyName
      avatar
    }
  }
`;

export const GET_PROFILE = gql`
  ${projectFields}
  ${specialistFields}

  query getProfileData($id: ID!, $isOwner: Boolean!) {
    specialist(id: $id) {
      ...SpecialistFields
      previousProjects(
        includeDrafts: $isOwner
        includeValidationFailed: $isOwner
        includeValidationPending: $isOwner
      ) {
        nodes {
          ...ProjectFields
        }
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query getCountries {
    countries {
      value: id
      label: name
    }
  }
`;

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

export const updateProfileOptimisticResponse = (specialist, values) => {
  return {
    __typename: "Mutation",
    updateProfile: {
      __typename: "UpdateProfilePayload",
      specialist: {
        __typename: "Specialist",
        ...specialist,
        ...values,
        country: {
          __typename: "Country",
          id: values.country,
        },
      },
    },
  };
};

export const SET_COVER_PHOTO = gql`
  ${specialistFields}

  mutation SetCoverPhoto($input: SetCoverPhotoInput!) {
    setCoverPhoto(input: $input) {
      specialist {
        ...SpecialistFields
      }
    }
  }
`;

export const GET_GUILD_POSTS = gql`
  ${GuildPostFields}

  query profileGuildPosts($id: ID!, $cursor: String) {
    specialist(id: $id) {
      id
      guildPosts(first: 10, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...GuildPostFields
            author {
              id
              bio
              location
              firstName
            }
          }
        }
      }
    }
  }
`;

export function useGuildPosts(opts) {
  return useQuery(GET_GUILD_POSTS, opts);
}
