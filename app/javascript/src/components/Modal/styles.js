import styled, { keyframes, css } from "styled-components";
import { withSpacing } from "../Spacing";
import { animated } from "react-spring";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  animation: ${fadeIn} 500ms ease-out;
`;

const windowWidths = {
  m: "500px",
  l: "700px",
};

const expandOnMobile = enabled => {
  if (!enabled) return css``;

  return css`
    @media (max-width: 800px) {
      width: 100%;
      height: 100%;
      border-radius: 0px;
      max-height: 100% !important;
    }
  `;
};

export const WindowContainer = styled(animated.div)`
  z-index: 30;
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-width: ${props => windowWidths[props.size || "m"]};
  ${props => expandOnMobile(props.expandOnMobile || false)};
`;

let WindowStyles = styled.div`
  width: 100%;
  z-index: 500;
  display: flex;
  margin: 0 auto;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  max-height: calc(100vh - 60px);
  box-shadow: 0px 10px 50px rgba(14, 29, 78, 0.3);
  transition: transform 400ms, opacity 300ms;
  ${props => expandOnMobile(props.expandOnMobile)};

  opacity: 0;
  transform: scale(0.98) translate3d(0, -80px, 0);
`;

export const Window = withSpacing(WindowStyles);

export const ModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  padding: ${props => !props.expandOnMobile && "15px"};

  &:first-child ${Backdrop} {
    background: rgba(76, 87, 126, 0.7);
  }

  &:last-child ${Window} {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 25px 50px 25px 30px;
  border-bottom: 1px solid #e4e5eb;
`;

export const ModalBody = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
`;

export const ModalFooter = styled.div`
  padding: 25px 30px;
  border-top: 1px solid #e4e5eb;
`;

export const CloseModal = styled.button`
  top: 15px;
  z-index: 2;
  right: 15px;
  width: 30px;
  height: 30px;
  border: none;
  display: block;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  background: #f1f3fd;
  svg {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
