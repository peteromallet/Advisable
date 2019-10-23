import React from "react";
import styled from "styled-components";
import { Box, Icon, Text, theme, Tooltip } from "@advisable/donut";

const Tag = styled.div`
  height: 22px;
  margin-right: 4px;
  margin-bottom: 4px;
  display: inline-flex;
  color: ${theme.colors.orange[8]};
  background: ${theme.colors.orange[0]};
  border-radius: 8px;
  padding: 0 10px;
  font-size: 11px;
  font-weight: 500;
  align-items: center;
  vertical-align: top;

  > div {
    display: inline-flex;
    align-items: center;
  }
`;

const Circle = styled.span`
  width: 14px;
  height: 14px;
  color: white;
  margin-right: 4px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.orange[5]};
`;

const TagCloud = ({ tags, maxRows, name }) => {
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
    <Box ref={ref}>
      {trimmed.map((tag, i) => (
        <Tag key={i}>
          <Tooltip
            content={
              tag.verified && (
                <>
                  <Text size="xs" fontWeight="medium" mb="xxs" color="white">
                    Verified Skill
                  </Text>
                  <Text size="xxs" lineHeight="xs" color="white">
                    This means that {name} has completed a project with the
                    skill "{tag.name}"
                  </Text>
                </>
              )
            }
          >
            {tag.verified && (
              <Circle>
                <Icon width={8} strokeWidth={4} icon="check" />
              </Circle>
            )}
            {tag.name}
          </Tooltip>
        </Tag>
      ))}
      {maxRows && <Tag>+ {rest.length}</Tag>}
    </Box>
  );
};

export default TagCloud;
