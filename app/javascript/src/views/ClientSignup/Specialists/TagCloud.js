import React from "react";
import styled from "styled-components";
import { theme } from "@advisable/donut";

const Tag = styled.div`
  height: 20px;
  margin-right: 4px;
  margin-bottom: 4px;
  display: inline-flex;
  color: ${theme.colors.yellow[7]};
  background: ${theme.colors.yellow[0]};
  border-radius: 6px;
  padding: 0 8px;
  font-size: 12px;
  align-items: center;
`;

const TagCloud = ({ tags, maxRows }) => {
  const ref = React.useRef(null);
  const [min, setMin] = React.useState(0);
  const [max, setMax] = React.useState(tags.length);
  const midPoint = Math.floor((min + max) / 2);

  React.useLayoutEffect(() => {
    if (!maxRows) return;
    if (min >= max) return;

    if (ref.current.offsetHeight <= maxRows * 24) {
      setMin(midPoint);
    } else {
      setMax(midPoint);
    }
  }, [min, max, setMin, setMax, midPoint, maxRows]);

  const trimmed = maxRows ? tags.slice(0, midPoint) : tags;
  const rest = tags.slice(midPoint, tags.length);

  return (
    <div ref={ref}>
      {trimmed.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ))}
      {maxRows && <Tag>+ {rest.length}</Tag>}
    </div>
  );
};

export default TagCloud;
