import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  position: fixed;
  pointer-events: ${(props) => (props.isOpen ? "all" : "none")};
`;

export const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: ${rgba(theme.colors.neutral900, 0.7)};
`;

export const Drawer = styled.div`
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
