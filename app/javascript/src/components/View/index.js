import React from "react";
import { Box } from "@advisable/donut";
import SimpleBar from "simplebar-react";
import { use100vh } from "react-div-100vh";
import { StyledView, StyledViewContent, StyledSidebar } from "./styles";

function ViewContent({ children, ...props }) {
  return (
    <StyledViewContent id="view" {...props}>
      {children}
    </StyledViewContent>
  );
}

function ViewSidebar({ children, padding, ...props }) {
  return (
    <StyledSidebar {...props}>
      <SimpleBar style={{ height: "100%" }}>
        <Box padding={padding}>{children}</Box>
      </SimpleBar>
    </StyledSidebar>
  );
}

function View({ children, ...props }) {
  const height = use100vh();
  return (
    <StyledView
      style={{
        height: height ? `${height - 60}px` : "100%",
      }}
      {...props}
    >
      {children}
    </StyledView>
  );
}

ViewSidebar.defaultProps = {
  padding: "24px",
};

View.defaultProps = {
  sidebar: { _: "off", l: "on" },
};

View.Sidebar = ViewSidebar;
View.Content = ViewContent;

export default View;
