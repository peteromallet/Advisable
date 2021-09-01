import React, { useRef } from "react";
import styled from "styled-components";
import { PaperClip } from "@styled-icons/heroicons-solid/PaperClip";
import { StyledSecondaryComposerButton } from "../styles";

const Input = styled.input`
  display: none;
`;

export default function AddAttachmentsButton({ onSelect }) {
  const inputRef = useRef();
  return (
    <>
      <Input
        ref={inputRef}
        name="message-attachments"
        type="file"
        multiple
        onChange={onSelect}
      />
      <StyledSecondaryComposerButton onClick={() => inputRef.current.click()}>
        <PaperClip />
        <span>Attachment</span>
      </StyledSecondaryComposerButton>
    </>
  );
}
