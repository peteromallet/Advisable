import { gql } from "@apollo/client";

export const CREATE_CHAT_DIRECT_MESSAGE = gql`
  mutation createChatDirectMessage($input: CreateChatDirectMessageInput!) {
    createChatDirectMessage(input: $input) {
      enqueued
    }
  }
`;
