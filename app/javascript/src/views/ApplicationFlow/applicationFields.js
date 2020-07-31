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
      previousProjects(includeDrafts: true) {
        nodes {
          id
          title
          excerpt
          draft
        }
      }
    }
    project {
      id
      currency
      questions
      airtableId
      primarySkill {
        id
        name
      }
      description
      industry
      companyType
      applicationsOpen
      companyDescription
      specialistDescription
    }
  }
`;
