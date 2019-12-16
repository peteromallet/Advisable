import gql from "graphql-tag";

export default gql`
  mutation CreateOffPlatformProject($input: CreateOffPlatformProjectInput!) {
    createOffPlatformProject(input: $input) {
      previousProject {
        project {
          ... on OffPlatformProject {
            id
            uid
            airtableId
            description
            primarySkill
            clientName
            confidential
            skills
            industry
            contactFirstName
            contactLastName
            validationStatus
          }
        }
        specialist {
          id
        }
        reviews {
          id
        }
      }
    }
  }
`;
