import React from "react";
import { theme } from "@advisable/donut";
import styled from "styled-components";
import { DotsVertical } from "@styled-icons/heroicons-outline/DotsVertical";

export const StyledMeatballButton = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.4);
  color: ${theme.colors.neutral700};
  border-radius: 24px;
  transition: 0.2s opacity;
  @media (hover: none) {
    opacity: 1;
  }
`;

export const StyledDropdown = styled.div`
  outline: none;
  background: white;
  display: none;
  overflow: hidden;
  border-radius: 16px;
  margin-top: ${theme.space[1]};
  box-shadow: 0 20px 40px -12px ${theme.colors.neutral900}24,
    0 2px 8px ${theme.colors.neutral900}12;
`;

const StyledMeatballWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  border-radius: 18px;
  &:hover ${StyledDropdown} {
    display: block;
  }
`;

export default function MeatballMenu({ children }) {
  return (
    <StyledMeatballWrapper>
      <StyledMeatballButton onClick={(e) => e.preventDefault()} role="button">
        <DotsVertical size={24} />
      </StyledMeatballButton>
      <StyledDropdown>{children}</StyledDropdown>
    </StyledMeatballWrapper>
  );
}
