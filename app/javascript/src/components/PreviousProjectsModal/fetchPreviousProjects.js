import { gql } from "@apollo/client";

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
