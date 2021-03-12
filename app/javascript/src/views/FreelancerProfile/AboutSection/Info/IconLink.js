import React from "react";
import {
  Link,
  Text,
  Circle,
  Tooltip,
  theme,
  useBreakpoint,
} from "@advisable/donut";
import { lighten } from "polished";
import styled from "styled-components";

const StyledCircle = styled(Circle)`
  transition: color 0.2s, background 0.2s;
  color: ${lighten(0.06, theme.colors.neutral700)};
  background: ${lighten(0.01, theme.colors.neutral200)};
  &:hover {
    background: ${lighten(0.02, theme.colors.neutral200)};
    color: ${lighten(0.14, theme.colors.neutral700)};
  }
`;

function IconLink({ title, Icon, url, strokeWidth }) {
  const isTablet = useBreakpoint("l");
  const TooltipContent = <Text color="blue100">{title}</Text>;

  return (
    <Link.External href={url} mx={{ _: "2px", l: "xxs" }} target="_blank">
      <Tooltip placement="top" content={TooltipContent}>
        <StyledCircle size={[42, 42, 35, 42]}>
          <Icon size={isTablet ? 20 : 24} strokeWidth={strokeWidth} />
        </StyledCircle>
      </Tooltip>
    </Link.External>
  );
}

export default IconLink;
