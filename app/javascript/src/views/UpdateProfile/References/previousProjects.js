import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on Specialist {
        id
        airtableId
        previousProjects(includeValidationFailed: true) {
          project {
            ... on Project {
              id
              airtableId
              description
              primarySkill
              user {
                id
                companyName
              }
            }
            ... on OffPlatformProject {
              id
              airtableId
              description
              primarySkill
              clientName
              confidential
              skills
              primarySkill
              industry
              validationStatus
            }
          }
          reviews {
            id
            name
            role
            comment
            ratings {
              overall
              skills
              qualityOfWork
              adherenceToSchedule
              availability
              communication
            }
          }
        }
      }
    }
  }
`;
