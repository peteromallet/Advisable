import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished'

export const ModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;
  padding: 20px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    align-items: flex-end;
  }
`

export const Window = styled.div.attrs({
  style: ({ styles }) => ({
    opacity: styles.opacity,
    transform: `translatey(${styles.translateY}px)`
  })
})`
  width: 500px;
  z-index: 500;
  background: white;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 15px 50px -15px #233951;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  animation: ${fadeIn} 500ms ease-out;
  background: ${rgba('#24384E', 0.85)};
`

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
  background: #F1F3FD;
`
