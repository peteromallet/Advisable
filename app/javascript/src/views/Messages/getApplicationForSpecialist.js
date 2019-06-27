import gql from "graphql-tag";

export default gql`
  query application($id: ID!) {
    application(id: $id) {
      id
      rate
      status
      airtableId
      availability
      monthlyLimit
      projectType
      interview {
        id
        airtableId
        status
      }
      project {
        id
        airtableId
        primarySkill
        user {
          id
          companyName
        }
      }
    }
  }
`;
