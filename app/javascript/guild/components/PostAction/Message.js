import React from "react";
import { Chat } from "@styled-icons/heroicons-outline";
import { useModal } from "@advisable/donut";
import PostAction from "./index";
import { useNotifications } from "components/Notifications";
import MessageModal from "@guild/components/MessageModal";

function MessagePostAction({ post }) {
  const modal = useModal();
  const notifications = useNotifications();

  const handleSend = () => {
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
