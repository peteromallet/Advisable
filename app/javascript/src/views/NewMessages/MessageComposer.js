import React, { useLayoutEffect, useRef, useState } from "react";
import { theme, Box } from "@advisable/donut";
import { gql, useMutation } from "@apollo/client";
// import { CONVERSATION } from "./Conversation";
// import { MESSAGE_FIELDS } from "./queries";
import styled from "styled-components";
import { PaperClip } from "@styled-icons/heroicons-solid/PaperClip";
import { ArrowCircleRight } from "@styled-icons/heroicons-solid/ArrowCircleRight";

const StyledMessageComposer = styled.form`
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

const StyledAttachmentButton = styled(ComposerButton)`
  color: ${theme.colors.neutral500};
  background: transparent;

  &:not(:disabled):hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }

  &:not(:disabled):active {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

// export const SEND_MESSAGE = gql`
//   ${MESSAGE_FIELDS}

//   mutation sendMessage($input: SendMessageInput!) {
//     sendMessage(input: $input) {
//       message {
//         ...MessageFields
//         conversation {
//           id
//           unreadMessages
//         }
//       }
//     }
//   }
// `;

const MIN_ROWS = 2;
const MAX_ROWS = 10;
const LINE_HEIGHT = 20;

export default function MessageComposer({ conversation }) {
  const textarea = useRef(null);
  const container = useRef(null);
  const [value, setValue] = useState("");
  // const [sendMessage] = useMutation(SEND_MESSAGE, {
  //   update(cache, response) {
  //     const message = response.data?.sendMessage?.message;

  //     if (message) {
  //       cache.writeQuery({
  //         query: CONVERSATION,
  //         variables: { id: conversation.id },
  //         data: {
  //           conversation: {
  //             ...conversation,
  //             messages: {
  //               ...conversation.messages,
  //               edges: [...conversation.messages.edges, { node: message }],
  //             },
  //           },
  //         },
  //       });
  //     }
  //   },
  // });

  useLayoutEffect(() => {
    textarea.current.rows = MIN_ROWS;
    const baseHeight = textarea.current.scrollHeight;
    const currentRows = Math.floor(baseHeight / LINE_HEIGHT);
    const rows = currentRows >= MAX_ROWS ? MAX_ROWS : currentRows;
    textarea.current.rows = rows;
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await sendMessage({
    //   variables: {
    //     input: {
    //       conversation: conversation.id,
    //       content: value,
    //     },
    //   },
    // });

    setValue("");
  };

  const handleClick = (e) => {
    if (e.target === container.current) {
      textarea.current.focus();
    }
  };

  return (
    <StyledMessageComposer
      onClick={handleClick}
      ref={container}
      onSubmit={handleSubmit}
    >
      <textarea
        value={value}
        ref={textarea}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a message..."
      />

      <Box
        height="52px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={2}
      >
        <StyledMessageButton disabled={value.trim().length === 0}>
          <span>Send</span>
          <ArrowCircleRight />
        </StyledMessageButton>
        <div>
          <StyledAttachmentButton>
            <PaperClip />
          </StyledAttachmentButton>
        </div>
      </Box>
    </StyledMessageComposer>
  );
}
