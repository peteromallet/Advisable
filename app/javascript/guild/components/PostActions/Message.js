import React from "react";
import { Chat } from "@styled-icons/heroicons-outline";
import { useModal } from "@advisable/donut";
import PostAction from "./PostAction";
import { useNotifications } from "components/Notifications";
import MessageModal from "@guild/components/MessageModal";
import { useApolloClient } from "@apollo/client";

function MessagePostAction({ post }) {
  const modal = useModal();
  const client = useApolloClient();
  const notifications = useNotifications();

  const handleSend = () => {
    client.cache.modify({
      id: client.cache.identify(post),
      fields: {
        engagementsCount(count) {
          return count + 1;
        },
      },
    });

    notifications.notify(
      `Your message has been sent to ${post.author.firstName}`,
    );
  };

  return (
    <>
      <MessageModal
        recipient={post.author}
        post={post}
        modal={modal}
        onSend={handleSend}
      />
      <PostAction
        color="cyan700"
        bg="neutral100"
        icon={<Chat />}
        onClick={modal.show}
      />
    </>
  );
}

export default MessagePostAction;
