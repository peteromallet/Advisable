import gql from "graphql-tag";
import taskFields from "./task";

export default gql`
  ${taskFields}

  fragment TaskDetailFields on Task {
    ...TaskFields
    application {
      id
      rate
      airtableId
      specialist {
        id
        firstName
      }
      project {
        id
        currency
        user {
          id
          companyName
        }
      }
    }
  }
`;
