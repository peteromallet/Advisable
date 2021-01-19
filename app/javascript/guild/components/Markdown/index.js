import React from "react";
import ReactMarkdown from "react-markdown";
import { StyledMarkdown } from "./styles";
import urlRegex from "url-regex";

export default function Markdown({ children }) {
  const formatLinks = (source) => source.replace(urlRegex(), "[$&]($&)");

  const renderLinks = ({ href }) => {
    const uri = href.startsWith("http") ? href : `//${href}`;
    return (
      <a href={uri} rel="noreferrer nofollow" target="_blank">
        {href}
      </a>
    );
  };

  return (
    <StyledMarkdown>
      <ReactMarkdown renderers={{ link: renderLinks }}>
        {formatLinks(children)}
      </ReactMarkdown>
    </StyledMarkdown>
  );
}
