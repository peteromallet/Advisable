import gql from "graphql-tag";

export default gql`
  mutation createUserAccount($input: CreateUserAccountInput!) {
    createUserAccount(input: $input) {
      project {
        airtableId
      }
    }
  }
`;
