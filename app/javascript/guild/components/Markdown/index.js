import React from "react";
import ReactMarkdown from "react-markdown";
import { StyledMarkdown } from "./styles";
import urlRegex from "url-regex";

export default function Markdown({ children }) {
  const formatLinks = (source) => source.replace(urlRegex(), "[$&]($&)");

  const renderLinks = ({ href }) => {
    const uri = href.startsWith("http") ? href : `//${href}`;
    return (
      <a href={uri} rel="nofollow">
        {href}
      </a>
    );
  };

  return (
    <StyledMarkdown>
      <ReactMarkdown
        source={formatLinks(children)}
        renderers={{ link: renderLinks }}
      >
        {children}
      </ReactMarkdown>
    </StyledMarkdown>
  );
}
