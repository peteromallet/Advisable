import gql from "graphql-tag";

export default gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
        airtableId
        goals
        status
        questions
        description
        depositOwed
        acceptedTerms
        primarySkill
        serviceType
        companyDescription
        specialistDescription
        requiredCharacteristics
        optionalCharacteristics
        user {
          name
          email
        }
      }
      errors {
        code
      }
    }
  }
`;
