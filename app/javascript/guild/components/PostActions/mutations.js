import { gql } from "@apollo/client";

export const DELETE_GUILD_POST = gql`
  mutation deleteGuildPost($input: DeleteGuildPostInput!) {
    deleteGuildPost(input: $input) {
      guildPost {
        id
      }
    }
  }
`;
