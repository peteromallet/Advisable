import gql from "graphql-tag";

export default gql`
  query specialists($skill: String!, $industry: String, $companyType: String) {
    specialists(skill: $skill, industry: $industry, companyType: $companyType) {
      totalCount
      nodes {
        id
        name
        firstName
        hourlyRate
        avatar
        bio
        location
        hourlyRate
        skills(projectSkills: true) {
          name
          verified
        }
        previousProjectsCount
        reviewsCount
        ratings {
          overall
        }
      }
    }
  }
`;
