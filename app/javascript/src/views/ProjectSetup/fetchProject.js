import gql from "graphql-tag";

export default gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      skills {
        id
        name
      }
      airtableId
      goals
      status
      questions
      description
      depositOwed
      acceptedTerms
      primarySkill
      companyDescription
      specialistDescription
      requiredCharacteristics
      optionalCharacteristics
    }
  }
`;
