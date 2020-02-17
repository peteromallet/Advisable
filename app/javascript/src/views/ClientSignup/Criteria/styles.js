import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

const selectedStyles = css`
  background: ${theme.colors.neutral[2]};
`;

export const StyledPopularSkill = styled.button`
  height: 40px;
  outline: none;
  line-height: 1;
  cursor: pointer;
  font-size: 16px;
  padding: 0 16px;
  font-weight: 500;
  appearance: false;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 20px;
  align-items: center;
  display: inline-flex;
  background: white;
  letter-spacing: -0.01em;
  background: white;
  color: ${theme.colors.neutral[8]};
  border: 1px solid ${theme.colors.neutral[2]};

  &:hover {
    color: ${theme.colors.neutral[9]};
    border-color: ${theme.colors.neutral[3]};
  }

  ${props => props.isSelected && selectedStyles};
`;
