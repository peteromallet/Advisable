import styled from "styled-components";

export const Drawer = styled.div`
  top: 0;
  left: 0;
  z-index: 3;
  width: 80vw;
  height: 100vh;
  padding: 20px;
  position: fixed;
  background: #052d59;
  box-shadow: inset -3px 0 5px #031428;
  transition: transform 300ms ease-out;
  transform-origin: 100% 50%;
  transform: ${props => (props.open ? `translateX(0) scaleX(1)` : `translateX(-100%) scaleX(.65)`)};

  display: none;
  @media screen and (max-width: 700px) {
    display: block;
  }
`;

export const Mask = styled.div`
  top: 0;
  right: 0;
  z-index: 3;
  width: 20vw;
  height: 100vh;
  position: fixed;
  display: ${props => props.open ? 'block' : 'none'}
`
