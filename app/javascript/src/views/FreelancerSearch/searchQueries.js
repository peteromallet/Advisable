import gql from "graphql-tag";

const searchFields = gql`
  fragment searchFields on Search {
    id
    skill {
      id
      name
    }
    results {
      nodes {
        id
        airtableId
        name
        firstName
        hourlyRate
        avatar
        bio
        location
        hourlyRate
        previousProjectsCount
        reviewsCount
        ratings {
          overall
        }
        skills(projectSkills: true) {
          name
          verified
        }
      }
    }
  }
`;

export const getSearch = gql`
  ${searchFields}

  query search($id: ID!) {
    search(id: $id) {
      ...searchFields
    }
  }
`;

export const createSearch = gql`
  ${searchFields}

  mutation createSearch($input: CreateSearchInput!) {
    createSearch(input: $input) {
      search {
        ...searchFields
      }
    }
  }
`;
