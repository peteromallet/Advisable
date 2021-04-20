import React from "react";
import ReactMarkdown from "react-markdown";
import { StyledMarkdown } from "./styles";
import urlRegex from "url-regex";

export default function Markdown({ children, ...props }) {
  const formatLinks = (source) => source?.replace(urlRegex(), "[$&]($&)");

  const linkClickHandler = (e) => {
    e.stopPropagation();
  };

  const renderLinks = ({ href }) => {
    const uri = href.startsWith("http") ? href : `//${href}`;

    return (
      <a
        href={uri}
        target="_blank"
        rel="noreferrer nofollow"
        onClick={linkClickHandler}
      >
        {href}
      </a>
    );
  };

  return (
    <StyledMarkdown {...props}>
      <ReactMarkdown components={{ link: renderLinks }}>
        {formatLinks(children)}
      </ReactMarkdown>
    </StyledMarkdown>
  );
}
