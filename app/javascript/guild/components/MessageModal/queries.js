import { gql, useMutation } from "@apollo/client";

export const SEND_POST_MESSAGE = gql`
  mutation SendGuildPostMessage($input: SendGuildPostMessageInput!) {
    sendGuildPostMessage(input: $input) {
      message {
        id
      }
    }
  }
`;

export function useSendPostMessage() {
  return useMutation(SEND_POST_MESSAGE);
}
