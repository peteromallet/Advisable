import gql from "graphql-tag";

export default gql`
  fragment ApplicationFields on Application {
    id
    status
    rate
    acceptsFee
    acceptsTerms
    airtableId
    introduction
    availability
    trialProgram
    questions {
      answer
      question
    }
    previousProjects(fallback: false) {
      project {
        ... on Project {
          airtableId
        }
        ... on OffPlatformProject {
          airtableId
        }
      }
    }
    specialist {
      bio
      airtableId
      previousProjects {
        project {
          ... on Project {
            id
            airtableId
            description
            primarySkill
            user {
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
            industry
            validationStatus
          }
        }
      }
    }
    project {
      id
      currency
      questions
      airtableId
      primarySkill
      description
      industry
      companyType
      applicationsOpen
      companyDescription
      specialistDescription
    }
  }
`;
