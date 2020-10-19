import { gql } from "@apollo/client";

export const UPDATE_CHAT_FRIENDLY_NAME = gql`
  mutation updateChatFriendlyName($input: UpdateChatFriendlyNameInput!) {
    updateChatFriendlyName(input: $input) {
      errors {
        message
      }
      chatChannel {
        sid
        dateUpdated
        friendlyName
      }
    }
  }
`;
