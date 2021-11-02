import { rgba } from "polished";
import { margin } from "styled-system";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";
import disabled from "./disabled.svg";

const CELL_HEIGHT = 40;

export const StyledAvailabilityInput = styled.div`
  ${margin};
  width: 100%;
  height: 100%;

  overflow: hidden;
  border-radius: 8px;
`;

export const StyledAvailabilityInputHeader = styled.div`
  display: flex;
  background: white;
  align-items: center;
  margin-bottom: 16px;
`;

export const StyledAvailabilityInputHeaderColumn = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &:first-child {
    width: 52px;
    flex-grow: 0;
    flex-basis: auto;
  }

  &:last-child {
    width: 52px;
    flex-grow: 0;
    flex-basis: auto;
    box-shadow: none;
  }
`;

export const StyledAvailabilityInputColumns = styled.div`
  width: 100%;
  display: flex;
  border-radius: 16px;
  box-shadow: inset 0 1px 4px ${rgba(theme.colors.neutral900, 0.04)};
  background: ${theme.colors.neutral100};
  overflow-y: scroll;
  max-height: ${(props) => props.maxHeight || "420px"};
`;

export const StyledAvailabilityInputColumn = styled.div`
  flex-grow: 1;
  height: 100%;
  flex-basis: 0;
  box-shadow: inset -1px 0 0 ${theme.colors.neutral200};

  &:first-child {
    width: 53px;
    flex-grow: 0;
    flex-basis: auto;
  }

  &:last-child {
    width: 53px;
    flex-grow: 0;
    flex-basis: auto;
    box-shadow: none;
  }
`;

export const StyledAvailabilityInputCellMarker = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
`;

const selectedCellStyles = css`
  ${StyledAvailabilityInputCellMarker} {
    background: ${theme.colors.neutral200};
    box-shadow: none;
  }
`;

const activeCellStyles = css`
  ${StyledAvailabilityInputCellMarker} {
    background: ${theme.colors.cyan300};
  }
`;

const inactiveCellStyles = css`
  &:not([disabled]):hover ${StyledAvailabilityInputCellMarker} {
    background: ${theme.colors.neutral200};
  }
`;

const cellWithEventStyles = css`
  &[disabled] {
    background-image: none;
  }

  ${StyledAvailabilityInputCellMarker} {
    background: ${theme.colors.cyan900};
    box-shadow: 0px 1px 2px ${rgba(theme.colors.cyan900, 0.1)};
  }
`;

export const StyledAvailabilityInputCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${CELL_HEIGHT}px;
  border: none;
  border-bottom: 1px solid ${theme.colors.neutral200};
  user-select: none;
  width: 100%;
  appearance: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;

  &[disabled] {
    background-image: url(${disabled});
  }

  &:last-child {
    border-bottom: none;
  }

  ${(props) => (props.isActive ? activeCellStyles : inactiveCellStyles)};
  ${(props) => props.isSelected && selectedCellStyles};
  ${(props) => props.hasEvent && cellWithEventStyles};
`;
