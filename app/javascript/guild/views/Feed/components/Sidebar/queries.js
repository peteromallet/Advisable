import { gql } from "@apollo/client";

export const SIDEBAR_QUERY = gql`
  query GuildSidebar {
    guildFeaturedMembers {
      id
      avatar
      name
      firstName
    }
    latestPrompt {
      id
      prompt
      cta
      description
      posts {
        id
        title
        author {
          id
          name
          avatar
        }
      }
      label {
        id
        name
        slug
      }
    }

    specialistRecommendation {
      recommendation {
        id
        name
        avatar
        firstName
      }
      ... on SkillsRecommendation {
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
      ... on RandomRecommendation {
        skills {
          id
          name
        }
      }
    }
  }
`;
