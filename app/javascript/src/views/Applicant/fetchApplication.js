import gql from "graphql-tag";

export default gql`
  query project($projectID: ID!, $applicationID: ID!) {
    project(id: $projectID) {
      id
      name
      currency
      airtableId
      primarySkill
      application(id: $applicationID) {
        id
        airtableId
        rate
        status
        featured
        comment
        availability
        referencesRequested
        introduction
        projectType
        monthlyLimit
        trialTask {
          id
        }
        questions {
          question
          answer
        }
        hasMoreProjects
        previousProjects {
          id
          title
          excerpt
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
        specialist {
          id
          airtableId
          name
          city
          email
          firstName
          reviewsCount
          ratings {
            overall
          }
          image {
            url
          }
          country {
            id
            name
          }
          linkedin
          skills {
            name
          }
        }
      }
      applications(status: ["Applied"]) {
        id
        featured
        airtableId
        specialist {
          id
          name
          city
          image {
            url
          }
          country {
            id
            name
          }
        }
      }
    }
  }
`;
