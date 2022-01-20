import React from "react";
import { ChatbubbleEllipses } from "@styled-icons/ionicons-outline/ChatbubbleEllipses";
import { useModal, Box, Tooltip } from "@advisable/donut";
import PostAction from "./PostAction";
import useViewer from "src/hooks/useViewer";
import ConnectModal from "./ConnectModal";

function ConnectAction({ post, size, walkthrough = false }) {
  const modal = useModal();
  const viewer = useViewer();
  const firstName = post.author.firstName;

  const handleConnect = () => {
    if (viewer?.isSpecialist && viewer?.isAccepted) {
      modal.show();
    } else {
      const cta = document.getElementById("joinGuild");
      cta?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const label = `Connect with ${firstName}`;

  return (
    <>
      <ConnectModal post={post} modal={modal} />
      <Tooltip placement="top" content={label}>
        <Box
          css={`
            outline: none;
          `}
        >
          <PostAction
            size={size}
            bg="neutral100"
            color="blue800"
            aria-label={label}
            icon={<ChatbubbleEllipses />}
            onClick={handleConnect}
            data-walkthrough={walkthrough ? "postConnect" : null}
          />
        </Box>
      </Tooltip>
    </>
  );
}

export default ConnectAction;
