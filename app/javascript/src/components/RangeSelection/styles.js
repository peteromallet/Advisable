import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledRangeSelection = styled.div`
  display: flex;
`;

export const StyledRAngeSelectionOptionBackground = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  border-radius: 12px;
  background: #f5f5f8;
  position: absolute;
`;

export const StyledRangeSelectionOption = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
`;

export const StyledRangeSelectionOptionWrapper = styled.div`
  flex: 1;
  margin: 0 4px;
  padding: 40px 12px;
  position: relative;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const StyledRangeSelectionOptionLabel = styled.label`
  z-index: 2;
  color: #323442;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: -0.02rem;
  position: relative;
`;

export const StyledRangeSelectionOptionCircle = styled.div`
  z-index: 2;
  width: 52px;
  height: 52px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: ${theme.colors.blue900};
  background: white;
  position: relative;
`;
