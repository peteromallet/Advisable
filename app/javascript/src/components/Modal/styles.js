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
  align-items: center;
  justify-content: center;
  padding: ${props => props.expandOnMobile ? 0 : '20px'};
`;

const windowWidths = {
  m: "500px",
  l: "700px"
};

export const Window = withSpacing(styled.div.attrs({
  style: ({ styles }) => ({
    opacity: styles.opacity,
    transform: `translatey(${styles.translateY}px)`
  })
})`
  z-index: 500;
  background: white;
  border-radius: 8px;
  position: relative;
  width: ${props => windowWidths[props.size || "m"]};
  box-shadow: 0px 10px 50px rgba(14, 29, 78, 0.3);

  ${props =>
    props.expandOnMobile &&
    css`
      @media (max-width: 800px) {
        width: 100%;
        height: 100%;
        border-radius: 0px;
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
  position: absolute;
  background: rgba(76, 87, 126, 0.7);
  animation: ${fadeIn} 500ms ease-out;
`;

export const CloseModal = styled.button`
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-radius: 50%;
  background: #f1f3fd;
`;
