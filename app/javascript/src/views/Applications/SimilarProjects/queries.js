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
          skills {
            id
            name
          }
        }
      }
    }
  }
`;
