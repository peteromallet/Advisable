import { rgba } from "polished";
import styled, { keyframes } from "styled-components";
import colors from "../../colors";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const TooltipWrapper = styled.span`
  outline: none;
  cursor: default;
`;

const SIZES = {
  s: "200px",
  m: "300px",
  l: "380px",
};

export const TooltipOverlay = styled.div`
  color: white;
  width: 90%;
  z-index: 500;
  font-size: 13px;
  font-weight: 400;
  max-width: ${props => SIZES[props.size || "m"]};
  line-height: 20px;
  border-radius: 8px;
  background: #0e173a;
  letter-spacing: 0.01rem;
  animation: ${fadeIn} 300ms;
  padding: 8px 12px 8px 12px;
  box-shadow: 0 1px 10px ${rgba("#0E173A", 0.1)};
  pointer-events: ${props => props.pointerEvents || "none"};
`;

export const Prompt = styled.div`
  font-weight: 500;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  color: ${colors.neutral.s7};

  svg {
    margin-top: -2px;
    margin-right: 6px;
  }
`;
