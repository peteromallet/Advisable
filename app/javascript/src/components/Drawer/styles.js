import { rgba } from "polished";
import { animated } from "react-spring";
import styled from "styled-components";
import colors from "../../colors";

export const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  position: fixed;
  pointer-events: ${(props) => (props.isOpen ? "all" : "none")};
`;

export const Backdrop = styled(animated.div)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: ${rgba(colors.neutral.s9, 0.7)};
`;

export const Drawer = styled(animated.div)`
  top: 0;
  right: 0;
  z-index: 2;
  width: 100%;
  position: fixed;
  max-width: 620px;
  background: white;
`;

export const Actions = styled.div`
  top: 20px;
  z-index: 3;
  right: 20px;
  display: flex;
  align-items: flex-start;
  position: absolute;
`;
