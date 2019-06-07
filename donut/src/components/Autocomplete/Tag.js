import React from "react";
import { Tag as TagStyles, TagName, RemoveTag } from "./styles";

const Tag = ({ children, onRemove }) => {
  return (
    <TagStyles>
      <TagName>{children}</TagName>
      <RemoveTag onClick={onRemove}>
        <svg
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.365368 1.78838C0.110469 1.53348 0.11047 1.12021 0.365368 0.865308C0.620267 0.610408 1.03354 0.610408 1.28844 0.865308L11.4422 11.0191C11.6971 11.274 11.6971 11.6873 11.4422 11.9422C11.1873 12.1971 10.774 12.1971 10.5191 11.9422L0.365368 1.78838Z"
            fill="#1944DC"
          />
          <path
            d="M10.5192 0.865327C10.7741 0.610427 11.1874 0.610427 11.4423 0.865327C11.6972 1.12023 11.6972 1.5335 11.4423 1.7884L1.2885 11.9422C1.03361 12.1971 0.620333 12.1971 0.365434 11.9422C0.110536 11.6873 0.110536 11.2741 0.365434 11.0192L10.5192 0.865327Z"
            fill="#1944DC"
          />
        </svg>
      </RemoveTag>
    </TagStyles>
  );
};

export default Tag;
