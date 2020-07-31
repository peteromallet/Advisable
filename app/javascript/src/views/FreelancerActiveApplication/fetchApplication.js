import gql from "graphql-tag";
import taskFields from "../../graphql/fragments/task";

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
      trialProgram
      trialTask {
        id
        stage
        name
      }
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
        hasSetupPayments
      }
      tasks {
        ...TaskFields
      }
    }
  }
`;
