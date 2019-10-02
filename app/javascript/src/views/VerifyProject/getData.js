import gql from "graphql-tag";

export default gql`
  query offPlatformProject($id: ID!) {
    offPlatformProject(id: $id) {
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
