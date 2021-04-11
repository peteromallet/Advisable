import { gql } from "@apollo/client";

export const SIDEBAR_QUERY = gql`
  query sidebar($includeRecommendation: Boolean!) {
    specialistRecommendation @include(if: $includeRecommendation) {
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
    guildFeaturedMembers {
      id
      avatar
      name
      firstName
    }
  }
`;
