import { gql, useMutation } from "@apollo/client";

export const CREATE_CHAT_DIRECT_MESSAGE = gql`
  mutation createChatDirectMessage($input: CreateChatDirectMessageInput!) {
    createChatDirectMessage(input: $input) {
      enqueued
    }
  }
`;

export const SEND_POST_MESSAGE = gql`
  mutation SendGuildPostMessage($input: SendGuildPostMessageInput!) {
    sendGuildPostMessage(input: $input) {
      message {
        id
      }
    }
  }
`;

export const useCreateChatDirectMessage = () => {
  return useMutation(CREATE_CHAT_DIRECT_MESSAGE);
};

export function useSendPostMessage() {
  return useMutation(SEND_POST_MESSAGE);
}
