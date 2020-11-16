import { gql } from "@apollo/client";

export default gql`
  mutation startWorking($input: StartWorkingInput!) {
    startWorking(input: $input) {
      application {
        id
        status
        projectType
        monthlyLimit
      }
    }
  }
`;
