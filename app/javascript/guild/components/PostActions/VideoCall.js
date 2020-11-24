import React from "react";
import { useApolloClient } from "@apollo/client";
import { VideoCamera } from "@styled-icons/heroicons-outline";
import { useModal } from "@advisable/donut";
import PostAction from "./PostAction";
import { useNotifications } from "components/Notifications";
import RequestVideoCallModal from "./RequestVideoCallModal";

function VideoCallAction({ post }) {
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
      <RequestVideoCallModal
        recipient={post.author}
        post={post}
        modal={modal}
        onSend={handleSend}
      />
      <PostAction
        color="blue800"
        bg="neutral100"
        icon={<VideoCamera />}
        onClick={modal.show}
      />
    </>
  );
}

export default VideoCallAction;
