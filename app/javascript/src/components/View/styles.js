import styled from "styled-components";
import { variant, compose, padding, display } from "styled-system";

export const StyledSidebar = styled.div`
  ${compose(padding, display)};

  left: 0;
  z-index: 3;
`;

export const StyledViewContent = styled.div`
  height: 100%;
`;

const viewVariants = variant({
  prop: "sidebar",
  variants: {
    on: {
      [StyledSidebar]: {
        position: "fixed",
        top: "60px",
        background: "white",
        boxShadow: "0px 1px 20px rgba(14, 31, 91, 0.04)",
        height: "calc(100vh - 60px)",
        width: "300px",
      },
      [StyledViewContent]: {
        paddingLeft: "300px",
      },
    },
    off: {
      [StyledSidebar]: {
        position: "relative",
        top: 0,
        background: "transparent",
        boxShadow: "none",
        height: "auto",
        width: "100%",
      },
      [StyledViewContent]: {
        paddingLeft: "0",
      },
    },
  },
});

export const StyledView = styled.div`
  ${viewVariants}

  display: block;
  position: relative;
`;
