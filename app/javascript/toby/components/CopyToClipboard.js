import React from "react";
import * as clipboard from "clipboard-polyfill/text";
import { StyledCellCopyButton } from "../styles";
import { ClipboardCopy } from "@styled-icons/heroicons-solid";
import { handlerForAttribute } from "../attributes";

export default function CopyToClipboard({ attribute, record }) {
  const handler = handlerForAttribute(attribute);
  if (!handler?.copy) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    clipboard.writeText(handler.copy(attribute, record));
  };

  return (
    <StyledCellCopyButton onClick={handleClick}>
      <ClipboardCopy size={20} />
    </StyledCellCopyButton>
  );
}
