import styled, { keyframes, css } from "styled-components";
import { withSpacing } from '../Spacing';

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
`;

const windowWidths = {
  m: "500px",
  l: "700px"
};

export const ModalBody = styled.div`
  flex-grow: 1;
  display: flex;
`

export const ModalHeader = styled.div`
  padding: 25px 30px;
  border-bottom: 1px solid #E4E5EB;
`

export const Window = withSpacing(styled.div.attrs(({ styles }) => ({
  style: {
    opacity: styles.opacity,
    transform: `translatey(${styles.translateY}px)`
  }
}))`
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
  max-width: ${props => windowWidths[props.size || "m"]};
  box-shadow: 0px 10px 50px rgba(14, 29, 78, 0.3);

  ${props =>
    props.expandOnMobile &&
    css`
      @media (max-width: 800px) {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        max-height: 100% !important;
      }
    `};
`);

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
  background: rgba(76, 87, 126, 0.7);
  animation: ${fadeIn} 500ms ease-out;
`;

export const CloseModal = styled.button`
  top: 15px;
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
