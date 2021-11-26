import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";
import CaseStudyFields from "@guild/graphql/fragments/caseStudyFields";

export const GUILD_POST_QUERY = gql`
  ${GuildPostFields}
  ${CaseStudyFields}
  query guildPost($id: ID!) {
    guildPost(id: $id) {
      ...GuildPostFields
      ...CaseStudyFields
      author {
        location
        id
        bio
        firstName
        profilePath
        name
      }
    }
  }
`;
