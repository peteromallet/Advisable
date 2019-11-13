import { lighten } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const Option = styled.div`
  margin-top: -1px;
  position: relative;
  padding: 24px 30px;
  border-top: 1px solid ${lighten(0.05, theme.colors.neutral[1])};
  border-bottom: 1px solid ${lighten(0.05, theme.colors.neutral[1])};

  &:hover {
    cursor: pointer;
    background: ${theme.colors.neutral[0]};
  }
`;

export const OptionChevron = styled.div`
  top: 50%;
  right: 30px;
  position: absolute;
  transform: translateY(-50%);
`;
