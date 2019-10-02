import gql from "graphql-tag";

export default gql`
  mutation CreateOffPlatformProject($input: CreateOffPlatformProjectInput!) {
    createOffPlatformProject(input: $input) {
      previousProject {
        project {
          ... on OffPlatformProject {
            id
            airtableId
            description
            primarySkill
            clientName
            confidential
            skills
            industry
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
