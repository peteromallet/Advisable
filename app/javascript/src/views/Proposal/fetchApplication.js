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
      tasks {
        id
        name
        stage
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
