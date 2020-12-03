import { gql, useMutation } from "@apollo/client";

export const CREATE_CHAT_DIRECT_MESSAGE = gql`
  mutation createChatDirectMessage($input: CreateChatDirectMessageInput!) {
    createChatDirectMessage(input: $input) {
      enqueued
    }
  }
`;

export const useCreateChatDirectMessage = () => {
  return useMutation(CREATE_CHAT_DIRECT_MESSAGE);
};
