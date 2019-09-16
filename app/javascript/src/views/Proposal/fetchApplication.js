import gql from "graphql-tag";

export default gql`
  query Application($id: ID!) {
    application(id: $id) {
      id
      airtableId
      status
      rate
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
