import gql from "graphql-tag";
import taskFields from "./task";

export default gql`
  ${taskFields}

  fragment TaskDetailFields on Task {
    ...TaskFields
    application {
      id
      rate
      status
      airtableId
      projectType
      specialist {
        id
        firstName
      }
      trialTask {
        id
        stage
        name
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
