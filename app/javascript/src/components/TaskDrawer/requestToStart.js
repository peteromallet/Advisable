import gql from "graphql-tag";

export default gql`
  mutation requestToStart($input: RequestToStartInput!) {
    requestToStart(input: $input) {
      task {
        id
        stage
      }
      errors {
        code
      }
    }
  }
`;
