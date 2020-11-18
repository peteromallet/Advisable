import React from "react";
import ReactMarkdown from "react-markdown";
import { StyledMarkdown } from "./styles";

export default function Markdown({ children }) {
  return (
    <StyledMarkdown>
      <ReactMarkdown>{children}</ReactMarkdown>
    </StyledMarkdown>
  );
}
