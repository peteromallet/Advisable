import { gql } from "@apollo/client";

export const CREATE_GUILD_COMMENT = gql`
  mutation createGuildComment($input: CreateGuildCommentInput!) {
    createGuildComment(input: $input) {
      guildComment {
        id
        body
        post {
          id
        }
        author {
          id
        }
      }
    }
  }
`;
