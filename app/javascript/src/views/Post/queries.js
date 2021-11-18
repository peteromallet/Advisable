import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";
import CaseStudyFields from "@guild/graphql/fragments/caseStudyFields";

export const GUILD_POST_QUERY = gql`
  ${GuildPostFields}
  ${CaseStudyFields}
  query guildPost($id: ID!, $includePostPrompt: Boolean = false) {
    guildPost(id: $id) {
      ...GuildPostFields
      ...CaseStudyFields
      postPrompt @include(if: $includePostPrompt) {
        id
        label {
          id
          name
          slug
        }
      }
      author {
        location
        id
        bio
        firstName
        name
      }
    }
  }
`;
