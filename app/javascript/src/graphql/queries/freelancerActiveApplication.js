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
      projectType
      monthlyLimit
      project {
        id
        currency
        primarySkill
        user {
          id
          name
          email
          firstName
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
