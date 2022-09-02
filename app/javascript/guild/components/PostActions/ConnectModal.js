import React, { useState } from "react";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";
import { Chat } from "@styled-icons/heroicons-solid/Chat";
import { Link as LinkIcon } from "@styled-icons/heroicons-solid/Link";
import { VideoCamera } from "@styled-icons/heroicons-solid/VideoCamera";
import { Modal, Circle, Box, Text, Link } from "@advisable/donut";
import ShareModal from "./ShareModal";
import MessageModal from "@guild/components/MessageModal";
import RequestVideoCallModal from "./RequestVideoCallModal";
import { StyledConnectionType } from "./styles";

function Back({ setConnectionType }) {
  const handleBack = (e) => {
    e.preventDefault(e);
    setConnectionType(null);
  };

  return (
    <Box mb={3} display="flex" alignItems="center">
      <Link.External href="#" variant="subtle" onClick={handleBack}>
        <ArrowLeft size={16} />
        <Box ml={1}>Back</Box>
      </Link.External>
    </Box>
  );
}

function ConnectionType({ post, modal }) {
  const [connectionType, setConnectionType] = useState(null);
  const firstName = post.author.firstName;

  switch (connectionType) {
    case "MESSAGE": {
      return (
        <>
          <Back setConnectionType={setConnectionType} />
          <MessageModal post={post} onSend={modal.hide} />
        </>
      );
    }
    case "VIDEO": {
      return (
        <>
          <Back setConnectionType={setConnectionType} />
          <RequestVideoCallModal post={post} onSend={modal.hide} />
        </>
      );
    }
    case "SHARE": {
      return (
        <>
          <Back setConnectionType={setConnectionType} />
          <ShareModal externalUrl={`https://advisable.com/posts/${post.id}`} />
        </>
      );
    }
    default:
      return (
        <>
          <Text
            fontSize="4xl"
            marginBottom={8}
            color="neutral900"
            textAlign="center"
            fontWeight="medium"
            letterSpacing="-0.02rem"
          >
            Connect with {firstName}
          </Text>
          <Box
            textAlign="center"
            display="grid"
            gridGap="8px"
            gridTemplateColumns={{ _: "1fr", m: "1fr 1fr 1fr" }}
          >
            <StyledConnectionType
              onClick={() => setConnectionType("MESSAGE")}
              aria-label={`Send ${firstName} a message`}
              data-testid={`Send ${firstName} a message`}
            >
              <Circle bg="blue400" color="white" mb={5}>
                <Chat size={24} />
              </Circle>
              <Text fontWeight="medium" mb={1}>
                Message
              </Text>
              <Text color="neutral700" fontSize="xs" lineHeight="1.1rem">
                Send {firstName} an instant message
              </Text>
            </StyledConnectionType>
            <StyledConnectionType
              onClick={() => setConnectionType("VIDEO")}
              aria-label={`Request call with ${firstName}e`}
              data-testid={`Request call with ${firstName}`}
            >
              <Circle bg="cyan500" color="white" mb={5}>
                <VideoCamera size={24} />
              </Circle>
              <Text fontWeight="medium" mb={1}>
                Request Call
              </Text>
              <Text color="neutral700" fontSize="xs" lineHeight="1.1rem">
                Request a call with {firstName} by sending them a link to your
                Calendly.
              </Text>
            </StyledConnectionType>
            <StyledConnectionType onClick={() => setConnectionType("SHARE")}>
              <Circle bg="orange400" color="white" mb={5}>
                <LinkIcon size={24} />
              </Circle>
              <Text fontWeight="medium" mb={1}>
                Share
              </Text>
              <Text color="neutral700" fontSize="xs" lineHeight="1.1rem">
                Help {firstName} connect with others by sharing their post
              </Text>
            </StyledConnectionType>
          </Box>
        </>
      );
  }
}

export default function ConnectModal({ modal, post }) {
  const firstName = post.author.firstName;
  return (
    <Modal
      width={680}
      padding={12}
      modal={modal}
      label={`Connect with ${firstName}`}
    >
      <ConnectionType post={post} modal={modal} />
    </Modal>
  );
}
