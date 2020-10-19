import { gql } from "@apollo/client";

export const GUILD_UPDATE_POST_REACTIONS = gql`
  mutation guildUpdatePostReactions($input: GuildUpdatePostReactionsInput!) {
    guildUpdatePostReactions(input: $input) {
      guildPost {
        id
        reactionsCount
        reacted
      }
    }
  }
`;
