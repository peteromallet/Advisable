import styled from "styled-components";
import { variant, compose, padding, display } from "styled-system";

export const StyledSidebar = styled.div`
  ${compose(padding, display)};

  z-index: 3;
  background: white;
  height: calc(100vh - 60px);
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);
`;

export const StyledViewContent = styled.div`
  flex: 1;
  height: 100%;
`;

const viewVariants = variant({
  prop: "type",
  variants: {
    horizontal: {
      flexDirection: "row",
      [StyledSidebar]: {
        display: "block",
        background: "white",
        boxShadow: "0px 1px 20px rgba(14, 31, 91, 0.04)",
        height: "calc(100vh - 60px)",
        width: "300px",
      },
      [StyledViewContent]: {
        overflowY: "scroll",
      },
    },
    vertical: {
      flexDirection: "column",
      [StyledSidebar]: {
        display: "block",
        background: "transparent",
        boxShadow: "none",
        height: "auto",
        width: "100%",
      },
      [StyledViewContent]: {
        overflowY: "visible",
      },
    },
    contentOnly: {
      [StyledSidebar]: {
        display: "none",
      },
    },
  },
});

export const StyledView = styled.div`
  ${viewVariants}

  display: flex;
  position: relative;
`;
