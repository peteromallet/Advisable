import gql from "graphql-tag";

export default gql`
  query previousProject($id: ID!) {
    previousProject(id: $id) {
      id
      clientName
      contactEmail
      validationStatus
      contactFirstName
      contactLastName
      primarySkill {
        id
        name
      }
      specialist {
        id
        name
      }
    }
  }
`;
