import { useApolloClient, useMutation } from "@apollo/client";
import CREATE_CONVERSATION from "./createConversation.gql";
import {
  updateConversation,
  updateConversationsList,
} from "src/views/NewMessages/queries";
import { useLocation } from "react-router-dom";

export function useCreateConversation() {
  const client = useApolloClient();
  const location = useLocation();
  return useMutation(CREATE_CONVERSATION, {
    onCompleted(data) {
      const message = data?.createConversation?.message;
      updateConversationsList(client, message.conversation);
      updateConversation(client, location, message);
    },
  });
}
