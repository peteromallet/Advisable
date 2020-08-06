import { gql } from "@apollo/client";

export default gql`
  mutation SetTypeForProject($input: SetTypeForProjectInput!) {
    setTypeForProject(input: $input) {
      application {
        id
        projectType
        monthlyLimit
      }
    }
  }
`;
