import { gql } from "@apollo/client";

const searchFields = gql`
  fragment searchFields on Search {
    id
    description
    skill {
      id
      name
    }
    industry {
      id
      name
      color
    }
    recommendation {
      id
      goal
      title
      description
      clientName
      industries {
        id
        name
      }
      skills {
        id
        name
      }
      reviews {
        id
        name
        role
        comment
        ratings {
          skills
          communication
          qualityOfWork
          availability
          adherenceToSchedule
        }
      }
      specialist {
        id
        bio
        name
        avatar
        location
        firstName
        reviewsCount
        ratings {
          overall
        }
      }
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
