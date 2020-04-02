import gql from "graphql-tag";

export default gql`
  query previousProject($id: ID!) {
    previousProject(id: $id) {
      id
      clientName
      primarySkill
      contactEmail
      validationStatus
      contactFirstName
      contactLastName
      specialist {
        id
        name
      }
    }
  }
`;
