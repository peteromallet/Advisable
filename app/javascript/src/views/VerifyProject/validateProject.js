import gql from "graphql-tag";

export default gql`
  mutation validate($input: VerifyPreviousProjectInput!) {
    verifyPreviousProject(input: $input) {
      previousProject {
        id
        contactEmail
        validationStatus
      }
    }
  }
`;
