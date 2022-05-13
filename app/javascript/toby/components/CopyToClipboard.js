import React from "react";
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
    <button className="toby-copy-button" onClick={handleClick}>
      <ClipboardCopy size={20} />
    </button>
  );
}
