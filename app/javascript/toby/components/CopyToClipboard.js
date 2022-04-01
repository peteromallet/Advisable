import React from "react";
import { StyledCellCopyButton } from "../styles";
import { ClipboardCopy } from "@styled-icons/heroicons-solid";
import { handlerForAttribute } from "../attributes";

export default function CopyToClipboard({ attribute, record }) {
  const handler = handlerForAttribute(attribute);
  if (!handler?.copy) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    window.navigator.clipboard.writeText(handler.copy(attribute, record));
  };

  return (
    <StyledCellCopyButton onClick={handleClick}>
      <ClipboardCopy size={20} />
    </StyledCellCopyButton>
  );
}
