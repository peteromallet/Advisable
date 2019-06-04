import gql from "graphql-tag";

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
