import gql from "graphql-tag";
import taskFields from "../fragments/task";

export default gql`
  ${taskFields}

  query application($id: ID!) {
    application(id: $id) {
      id
      status
      rate
      airtableId
      project {
        id
        currency
        primarySkill
        user {
          id
          companyName
        }
      }
      specialist {
        id
        firstName
      }
      tasks {
        ...TaskFields
      }
    }
  }
`;
