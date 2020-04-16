import gql from "graphql-tag";

export default gql`
  query {
    viewer {
      ... on Specialist {
        id
        airtableId
        previousProjects(includeValidationFailed: true, includeDrafts: true) {
          nodes {
            id
            title
            draft
            excerpt
            validationStatus
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
