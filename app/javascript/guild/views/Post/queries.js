import { gql } from "@apollo/client";
import GuildPostFields from "@guild/graphql/fragments/guildPostFields";

export const GUILD_POST_QUERY = gql`
  ${GuildPostFields}
  query guildPost($id: ID!) {
    guildPost(id: $id) {
      ...GuildPostFields
      ... on GuildPostAdviceRequired {
        needHelp
      }
      images {
        id
        url
        cover
        position
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
