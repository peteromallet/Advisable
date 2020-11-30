import React from "react";
import { useApolloClient } from "@apollo/client";
import { VideoCamera } from "@styled-icons/heroicons-outline";
import { useModal, Tooltip, Box } from "@advisable/donut";
import PostAction from "./PostAction";
import { useNotifications } from "components/Notifications";
import RequestVideoCallModal from "./RequestVideoCallModal";
import useViewer from "src/hooks/useViewer";

function VideoCallAction({ post }) {
  const modal = useModal();
  const viewer = useViewer();
  const client = useApolloClient();
  const notifications = useNotifications();

  const handleAction = () => {
    if (viewer?.guild) {
      modal.show();
    } else {
      const cta = document.getElementById("joinGuild");
      cta?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = () => {
    client.cache.modify({
      id: client.cache.identify(post),
      fields: {
        engagementsCount(count) {
          return post.engaged ? count : count + 1;
        },
      },
    });

    notifications.notify(
      `Your message has been sent to ${post.author.firstName}`,
    );
  };

  return (
    <>
      {viewer?.guild ? (
        <RequestVideoCallModal
          recipient={post.author}
          post={post}
          modal={modal}
          onSend={handleSend}
        />
      ) : null}
      <Tooltip placement="top" content="Request Call">
        <Box
          css={`
            outline: none;
          `}
        >
          <PostAction
            color="blue800"
            bg="neutral100"
            icon={<VideoCamera />}
            onClick={handleAction}
          />
        </Box>
      </Tooltip>
    </>
  );
}

export default VideoCallAction;
