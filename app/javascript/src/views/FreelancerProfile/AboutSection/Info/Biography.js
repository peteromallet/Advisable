import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, theme } from "@advisable/donut";
import truncate from "lodash/truncate";

export const TRUNCATE_LIMIT = 280;

const StyledBioExpander = styled.span`
  cursor: pointer;
  padding-right: 4px;
  border-radius: 4px;
  &:hover {
    color: ${theme.colors.blue700};
    background: ${theme.colors.blue50};
  }
`;

function Biography({ bio }) {
  const length = bio?.length || 0;
  const [expandable, setExpandable] = useState(length > TRUNCATE_LIMIT);
  const [expanded, setExpanded] = useState(!expandable);

  useEffect(() => {
    const isExceededLimit = length > TRUNCATE_LIMIT;
    setExpandable(isExceededLimit);
    setExpanded(!isExceededLimit);
  }, [length]);

  return (
    <Text
      color="neutral800"
      fontSize={{ _: "m", s: "l" }}
      lineHeight="140%"
      pr={{ _: "s", l: "3xl" }}
    >
      {expanded ? bio : truncate(bio, { length: TRUNCATE_LIMIT })}
      {expandable && (
        <Text
          as={StyledBioExpander}
          color="blue600"
          onClick={() => setExpanded((e) => !e)}
          paddingLeft="2xs"
          data-testid="expandCollapseBio"
        >
          {expanded ? "see\u00A0less" : "see\u00A0more"}
        </Text>
      )}
    </Text>
  );
}

export default Biography;
