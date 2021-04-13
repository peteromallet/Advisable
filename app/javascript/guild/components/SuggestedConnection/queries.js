import { gql } from "@apollo/client";

export const SUGGESTED_CONNECTION_QUERY = gql`
  query specialistRecommendation {
    specialistRecommendation {
      recommendation {
        id
        name
        avatar
        firstName
      }
      ... on SkillRecommendation {
        skills {
          id
          name
        }
      }
      ... on IndustryRecommendation {
        industries {
          id
          name
        }
      }
    }
  }
`;
