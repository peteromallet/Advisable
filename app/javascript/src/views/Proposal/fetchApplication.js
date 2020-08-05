import { gql } from "@apollo/client";

export default gql`
  query Application($id: ID!) {
    application(id: $id) {
      id
      airtableId
      status
      rate
      trialProgram
      proposalComment
      projectType
      monthlyLimit
      trialTask {
        id
        stage
        name
      }
      tasks {
        id
        name
        stage
        trial
        dueDate
        description
        estimate
        estimateType
        repeat
      }
      specialist {
        id
        firstName
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
          companyName
        }
      }
    }
  }
`;
