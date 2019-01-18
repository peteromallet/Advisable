// Skeleton text is used to render a loading indicator that represents a
// paragraph of text.
import React from "react";
import {
  SkeletonTextLine,
  SkeletonTextContainer
} from "./styles";

export default ({ lines = 3 }) => {
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(<SkeletonTextLine key={i} />)
  }

  return (
    <SkeletonTextContainer>
      {lineElements}
    </SkeletonTextContainer>
  )
}