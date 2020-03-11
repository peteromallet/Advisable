import gql from "graphql-tag";

export default gql`
  mutation AcceptInterviewRequest($input: AcceptInterviewRequestInput!) {
    acceptInterviewRequest(input: $input) {
      interview {
        id
        status
        startsAt
      }
      errors
    }
  }
`;
