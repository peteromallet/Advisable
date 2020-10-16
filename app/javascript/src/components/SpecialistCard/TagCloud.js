import { useRef, useState, useLayoutEffect } from "react";
import { Check } from "@styled-icons/feather";
import styled from "styled-components";
import { Box, Text, theme, Tooltip } from "@advisable/donut";

const Tag = styled.div`
  height: 22px;
  margin-right: 4px;
  margin-bottom: 4px;
  display: inline-flex;
  color: ${theme.colors.blue900};
  background: ${theme.colors.neutral100};
  border-radius: 15px;
  padding: 0 10px;
  font-size: 12px;
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
  margin-left: -4px;
  margin-right: 6px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.blue500};
`;

const TagCloud = ({ tags, maxRows, name }) => {
  const ref = useRef(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(tags.length);
  const midPoint = Math.floor((min + max) / 2);

  useLayoutEffect(() => {
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
        <Tooltip
          key={i}
          content={
            tag.verified && (
              <>
                <Text size="xs" fontWeight="medium" mb="xxs" color="white">
                  Verified Skill
                </Text>
                <Text size="xxs" lineHeight="xs" color="white">
                  This means that {name} has completed a project with the skill
                  &quot;{tag.name}&quot;
                </Text>
              </>
            )
          }
        >
          <Tag>
            {tag.verified && (
              <Circle>
                <Check size={8} strokeWidth={4} />
              </Circle>
            )}
            {tag.name}
          </Tag>
        </Tooltip>
      ))}
      {maxRows && <Tag>+ {rest.length}</Tag>}
    </Box>
  );
};

export default TagCloud;
