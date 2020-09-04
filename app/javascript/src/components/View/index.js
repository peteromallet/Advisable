import React from "react";
import PropTypes from "prop-types";
import { use100vh } from "react-div-100vh";
import { StyledView, StyledViewContent, StyledSidebar } from "./styles";

function ViewContent({ children }) {
  return <StyledViewContent>{children}</StyledViewContent>;
}

ViewContent.propTypes = {
  children: PropTypes.node,
};

function ViewSidebar({ children, ...props }) {
  return <StyledSidebar {...props}>{children}</StyledSidebar>;
}

ViewSidebar.defaultProps = {
  width: "280px",
};

ViewSidebar.propTypes = {
  children: PropTypes.node,
};

function View({ children }) {
  const height = use100vh();
  return (
    <StyledView
      id="view"
      style={{
        height: height ? `${height - 58}px` : "100%",
      }}
    >
      {children}
    </StyledView>
  );
}

View.Sidebar = ViewSidebar;
View.Content = ViewContent;

View.propTypes = {
  children: PropTypes.node,
};

export default View;
