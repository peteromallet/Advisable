import gql from "graphql-tag";

export default gql`
  mutation RequestMoreInterviewTimes($input: RequestMoreInterviewTimesInput!) {
    requestMoreInterviewTimes(input: $input) {
      interview {
        id
        status
      }
    }
  }
`;
