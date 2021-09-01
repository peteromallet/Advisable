import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { theme, Text, Box, Stack } from "@advisable/donut";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { CloudUpload } from "@styled-icons/heroicons-solid/CloudUpload";
import { PaperAirplane } from "@styled-icons/heroicons-solid/PaperAirplane";
import useAttachments from "../hooks/useAttachments";
import AddAttachmentsButton from "./AddAttachmentsButton";
import Attachment from "./Attachment";
import { useSendMessage } from "../queries";
import { useNotifications } from "src/components/Notifications";
import useNetworkConnection from "src/hooks/useNetworkConnection";
import generateID from "src/utilities/generateID";
import { DateTime } from "luxon";

const StyledMessageComposer = styled.div`
  width: 100%;
  overflow: hidden;
  background: white;
  border-radius: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  textarea {
    margin: 0;
    resize: none;
    width: 100%;
    border: none;
    outline: none;
    padding: 20px;
    font-size: 17px;
    font-weight: 450;
    line-height: 24px;
    letter-spacing: -0.01rem;
    height: auto !important;
    font-family: TTHoves, sans-serif;
    border-bottom: 1px solid ${theme.colors.neutral100};

    &::placeholder {
      color: ${theme.colors.neutral400};
    }
  }
`;

const ComposerButton = styled.button`
  height: 32px;
  border: none;
  cursor: pointer;
  appearance: none;
  border-radius: 16px;
  align-items: center;
  display: inline-flex;

  span {
    padding: 0 8px 0 6px;
    font-size: 15px;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    width: 20px;
    margin-left: 4px;
  }
`;

const StyledMessageButton = styled(ComposerButton)`
  color: white;
  background: #2b59ff;

  &:not(:disabled):hover {
    background: #0027b0;
  }

  &:not(:disabled):active {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

function DropToUpload() {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView();
  }, []);

  return (
    <Box
      ref={ref}
      margin={4}
      paddingX={4}
      paddingY={8}
      display="flex"
      justifyContent="center"
      border="2px dashed"
      borderColor="blue800"
      bg="blue50"
      borderRadius="16px"
    >
      <CloudUpload size={20} />
      <Text marginLeft={2} color="blue900">
        Drop files here to upload
      </Text>
    </Box>
  );
}

const MIN_ROWS = 8;
const MAX_ROWS = 12;
export default function MessageComposer({ conversation, currentAccount }) {
  const container = useRef(null);
  const textarea = useRef(null);
  const [dragging, setDragging] = useState(false);
  const { error } = useNotifications();
  const isOnline = useNetworkConnection();
  const [send] = useSendMessage(conversation);
  const {
    attachments,
    signedIds,
    uploading,
    clearAttachments,
    addAttachments,
    removeAttachment,
    completeUpload,
    uploadedAttachments,
  } = useAttachments();
  const [value, setValue] = useState("");

  const hasValue = useMemo(() => {
    return value.trim().replace(/^\s+|\s+$/g, "").length > 0;
  }, [value]);

  const hasAttachments = useMemo(() => attachments.length > 0, [attachments]);
  const canSend = useMemo(() => {
    const hasContent = hasValue || hasAttachments;
    return hasContent && !uploading;
  }, [uploading, hasValue, hasAttachments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    setValue("");
    clearAttachments();

    const uid = generateID("msg");
    const content = value.trim().replace(/^\s+|\s+$/g, "");

    const { errors } = await send({
      variables: {
        input: {
          uid,
          content,
          conversation: conversation.id,
          attachments: signedIds,
        },
      },
      optimisticResponse: {
        sendMessage: {
          __typename: "SendMessagePayload",
          message: {
            __typename: "UserMessage",
            id: uid,
            content,
            status: "SENDING",
            author: currentAccount,
            createdAt: DateTime.now().toISO(),
            attachments: uploadedAttachments.map((attachment) => ({
              id: generateID("att"),
              url: null,
              isImage: false,
              filename: attachment.file.name,
            })),
          },
        },
      },
    });

    if (errors) {
      error("Failed to send message, please try again.");
    }
  };

  const handleClick = (e) => {
    if (e.target === container.current) {
      textarea.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.metaKey) {
      handleSubmit(e);
    }
  };

  const handleDrop = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setDragging(false);
      addAttachments(e.dataTransfer.files);
    },
    [addAttachments],
  );

  const handleDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!dragging) {
        setDragging(true);
      }
    },
    [dragging],
  );

  useEffect(() => {
    document.addEventListener("drop", handleDrop);
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("mouseout", handleDragEnd);

    return () => {
      document.removeEventListener("drop", handleDrop);
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("mouseout", handleDragEnd);
    };
  }, [handleDrop, handleDragOver, handleDragEnd]);

  return (
    <StyledMessageComposer
      $dragging={dragging}
      onClick={handleClick}
      ref={container}
    >
      {isOnline ? (
        <>
          <TextareaAutosize
            name="message"
            value={value}
            minRows={MIN_ROWS}
            maxRows={MAX_ROWS}
            ref={(tag) => (textarea.current = tag)}
            onKeyDown={handleKeyDown}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write a message..."
          />

          {dragging && <DropToUpload />}

          {hasAttachments && (
            <Stack px={4} divider="neutral100">
              {attachments.map((a) => (
                <Attachment
                  key={a.id}
                  attachment={a}
                  completeUpload={completeUpload}
                  onRemove={() => removeAttachment(a.id)}
                />
              ))}
            </Stack>
          )}

          <Box height="52px" display="flex" alignItems="center" paddingX={2}>
            <StyledMessageButton disabled={!canSend} onClick={handleSubmit}>
              <PaperAirplane />
              <span>Send</span>
            </StyledMessageButton>
            <Box marginLeft={2}>
              <AddAttachmentsButton
                onSelect={(e) => addAttachments(e.target.files)}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Box textAlign="center" padding={4} color="neutral600">
          Your connection has been lost, please refresh the page
        </Box>
      )}
    </StyledMessageComposer>
  );
}
