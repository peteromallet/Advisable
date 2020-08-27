import { gql } from "@apollo/client";

export const applicationFields = gql`
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

export const fetchApplication = gql`
  query Application($id: ID!) {
    application(id: $id) {
      ...ApplicationFields
    }
  }
  ${applicationFields}
`;

export const submitApplication = gql`
  mutation SubmitApplication($input: SubmitApplicationInput!) {
    submitApplication(input: $input) {
      application {
        id
        status
      }
      errors {
        code
      }
    }
  }
`;

export const updateApplication = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        ...ApplicationFields
      }
      errors {
        code
      }
    }
  }
  ${applicationFields}
`;
