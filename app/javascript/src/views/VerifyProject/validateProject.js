import gql from "graphql-tag";

export default gql`
  mutation validate($input: VerifyOffPlatformProjectInput!) {
    verifyOffPlatformProject(input: $input) {
      offPlatformProject {
        id
        contactEmail
        validationStatus
      }
    }
  }
`;
