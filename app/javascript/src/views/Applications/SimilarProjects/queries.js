import gql from "graphql-tag";

export const GET_SIMILAR_PROJECTS = gql`
  query similarProjects {
    viewer {
      ... on Specialist {
        id
        similarPreviousProjects {
          id
          title
          description
          specialist {
            id
            name
            avatar
            location
          }
          skills {
            id
            name
          }
        }
      }
    }
  }
`;
