import { gql } from "@apollo/client";

export const CHAT_GRANT_QUERY = gql`
  query chatGrant {
    chatGrant {
      identity
      accessToken
    }
  }
`;
