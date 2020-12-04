import React from "react";
import { ChatbubbleEllipses } from "@styled-icons/ionicons-outline";
import { useModal, Box, Tooltip } from "@advisable/donut";
import PostAction from "./PostAction";
import useViewer from "src/hooks/useViewer";
import ConnectModal from "./ConnectModal";

const LABELS = {
  AdviceRequired: () => `Offer help`,
  default: (name) => `Connect with ${name}`,
};

function ConnectAction({ post, size }) {
  const modal = useModal();
  const viewer = useViewer();
  const firstName = post.author.firstName;

  const handleConnect = () => {
    if (viewer?.guild) {
      modal.show();
    } else {
      const cta = document.getElementById("joinGuild");
      cta?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const label = LABELS[post.denormalizedType] || LABELS["default"];

  return (
    <>
      <ConnectModal post={post} modal={modal} />
      <Tooltip placement="top" content={label(firstName)}>
        <Box
          css={`
            outline: none;
          `}
        >
          <PostAction
            size={size}
            bg="neutral100"
            color="blue800"
            icon={<ChatbubbleEllipses />}
            onClick={handleConnect}
          />
        </Box>
      </Tooltip>
    </>
  );
}

export default ConnectAction;
