import { gql } from "@apollo/client";

export const applicationFields = gql`
  fragment ApplicationFields on Application {
    id
    status
    rate
    acceptsFee
    acceptsTerms
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
      linkedin
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
    }
  }
`;

export const updateApplication = gql`
  mutation UpdateApplication($input: UpdateApplicationInput!) {
    updateApplication(input: $input) {
      application {
        ...ApplicationFields
      }
    }
  }
  ${applicationFields}
`;

export const updateProfile = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      specialist {
        id
        linkedin
      }
    }
  }
`;
