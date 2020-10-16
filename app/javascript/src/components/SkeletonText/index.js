// Skeleton text is used to render a loading indicator that represents a
// paragraph of text.
import { SkeletonTextLine, SkeletonTextContainer } from "./styles";

export default function SkeletonText({ lines = 3, ...props }) {
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(<SkeletonTextLine key={i} />);
  }

  return (
    <SkeletonTextContainer {...props}>{lineElements}</SkeletonTextContainer>
  );
}
