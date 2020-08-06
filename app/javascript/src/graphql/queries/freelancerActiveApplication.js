import { gql } from "@apollo/client";
import taskFields from "../fragments/task";

export default gql`
  ${taskFields}

  query application($id: ID!) {
    viewer {
      ... on Specialist {
        id
        hasSetupPayments
      }
    }
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
        primarySkill {
          id
          name
        }
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
