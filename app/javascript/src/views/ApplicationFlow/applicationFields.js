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
      id
    }
    specialist {
      id
      bio
      airtableId
      previousProjects {
        nodes {
          id
          title
          excerpt
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
