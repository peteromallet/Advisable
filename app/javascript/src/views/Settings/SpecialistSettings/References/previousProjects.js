import { gql } from "@apollo/client";

export default gql`
  query {
    viewer {
      ... on Specialist {
        id
        previousProjects(includeValidationFailed: true, includeDrafts: true) {
          nodes {
            id
            title
            draft
            excerpt
            validationStatus
            contactFirstName
            contactLastName
            clientName
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
  }
`;
