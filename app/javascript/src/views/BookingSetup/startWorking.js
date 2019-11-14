import gql from "graphql-tag";

export default gql`
  mutation startWorking($input: StartWorkingInput!) {
    startWorking(input: $input) {
      application {
        id
        airtableId
        status
        projectType
        monthlyLimit
      }
    }
  }
`;
