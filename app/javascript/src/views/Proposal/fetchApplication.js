import gql from "graphql-tag";

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
      billingCycle
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
        primarySkill
        user {
          id
          companyName
        }
      }
    }
  }
`;
