import React, { useRef, useState } from "react";
import { theme, Box, Text, Stack } from "@advisable/donut";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { DocumentText } from "@styled-icons/heroicons-solid/DocumentText";
import { XCircle } from "@styled-icons/heroicons-solid/XCircle";
import { ArrowCircleRight } from "@styled-icons/heroicons-solid/ArrowCircleRight";
import useAttachments from "./useAttachments";
import AddAttachmentsButton from "./AddAttachmentsButton";
import { useSendMessage } from "./queries";

const StyledMessageComposer = styled.div`
  width: 100%;
  overflow: hidden;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 32px rgba(0, 0, 0, 0.08);

  textarea {
    margin: 0;
    resize: none;
    width: 100%;
    border: none;
    outline: none;
    padding: 16px;
    font-size: 17px;
    font-weight: 450;
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
    padding: 0 8px;
    font-size: 15px;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    width: 20px;
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

const MIN_ROWS = 2;
const MAX_ROWS = 10;

function Attachment({ attachment, onRemove }) {
  return (
    <Box
      paddingY={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box color="neutral500" marginRight={1}>
          <DocumentText size={20} />
        </Box>
        <Text color="neutral800" fontSize="sm">
          {attachment.file.name}
        </Text>
      </Box>
      <Box>
        <XCircle size={20} onClick={onRemove} />
      </Box>
    </Box>
  );
}

export default function MessageComposer({ conversation }) {
  const container = useRef(null);
  const textarea = useRef(null);
  const [send] = useSendMessage(conversation);
  const { attachments, clearAttachments, addAttachments, removeAttachment } =
    useAttachments();
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue("");
    clearAttachments();

    await send({
      variables: {
        input: {
          conversation: conversation.id,
          content: value.trim().replace(/^\s+|\s+$/g, ""),
        },
      },
    });
  };

  const hasValue = value.trim().replace(/^\s+|\s+$/g, "").length > 0;
  const hasAttachments = attachments.length > 0;

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

  return (
    <StyledMessageComposer onClick={handleClick} ref={container}>
      <TextareaAutosize
        value={value}
        minRows={MIN_ROWS}
        maxRows={MAX_ROWS}
        ref={(tag) => (textarea.current = tag)}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a message..."
      />

      {hasAttachments && (
        <Stack px={4} divider="neutral100">
          {attachments.map((a) => (
            <Attachment
              key={a.id}
              attachment={a}
              onRemove={() => removeAttachment(a.id)}
            />
          ))}
        </Stack>
      )}

      <Box
        height="52px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={2}
      >
        <StyledMessageButton
          onClick={handleSubmit}
          disabled={!hasValue && !hasAttachments}
        >
          <span>Send</span>
          <ArrowCircleRight />
        </StyledMessageButton>
        <div>{/* <AddAttachmentsButton onSelect={addAttachments} /> */}</div>
      </Box>
    </StyledMessageComposer>
  );
}
