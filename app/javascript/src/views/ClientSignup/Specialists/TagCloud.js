import React from "react";
import styled from "styled-components";
import { theme } from "@advisable/donut";

const Tag = styled.div`
  height: 22px;
  margin-right: 4px;
  margin-bottom: 4px;
  display: inline-flex;
  color: ${theme.colors.yellow[7]};
  background: ${theme.colors.yellow[0]};
  border-radius: 8px;
  padding: 0 10px;
  font-size: 11px;
  font-weight: 400;
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

    if (ref.current.offsetHeight <= maxRows * 26) {
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
