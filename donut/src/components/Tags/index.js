import React from "react";
import Tag from "../Tag";
import { StyledTags } from "./styles";

export default function Tags({ tags, variant, size, ...rest }) {
  return (
    <StyledTags {...rest}>
      {tags.map((tag, i) => (
        <Tag variant={variant} size={size} key={i}>
          {tag}
        </Tag>
      ))}
    </StyledTags>
  );
}
