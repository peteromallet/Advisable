import { rgba, lighten } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const Option = styled.div`
  margin-top: -1px;
  position: relative;
  padding: 24px 30px 24px 96px;
  border-top: 1px solid ${lighten(0.05, theme.colors.neutral[1])};
  border-bottom: 1px solid ${lighten(0.05, theme.colors.neutral[1])};

  &:hover {
    cursor: pointer;
    background: ${rgba(theme.colors.neutral[0], 0.5)};
  }
`;

export const OptionIcon = styled.div`
  top: 50%;
  left: 30px;
  width: 50px;
  height: 50px;
  display: flex;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  background: ${rgba(theme.colors.blue[1], 0.3)};
`;

export const OptionChevron = styled.div`
  top: 50%;
  right: 30px;
  position: absolute;
  transform: translateY(-50%);
`;
