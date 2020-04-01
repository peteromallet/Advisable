import gql from "graphql-tag";

export default gql`
  query specialistPreviousProjects($id: ID!) {
    specialist(id: $id) {
      previousProjects {
        nodes {
          id
          title
          excerpt
          reviews {
            id
            ratings {
              overall
            }
          }
        }
      }
    }
  }
`;
