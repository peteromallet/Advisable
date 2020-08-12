import React from "react";
import PropTypes from "prop-types";
import { StyledView, StyledViewContent, StyledSidebar } from "./styles";

function ViewContent({ children }) {
  return <StyledViewContent>{children}</StyledViewContent>;
}

ViewContent.propTypes = {
  children: PropTypes.node,
};

function ViewSidebar({ children }) {
  return <StyledSidebar>{children}</StyledSidebar>;
}

ViewSidebar.propTypes = {
  children: PropTypes.node,
};

function View({ children }) {
  const hasSidebar = React.Children.toArray(children).some((child) => {
    return child?.type?.name === ViewSidebar.name;
  });

  return <StyledView $hasSidebar={hasSidebar}>{children}</StyledView>;
}

View.Sidebar = ViewSidebar;
View.Content = ViewContent;

View.propTypes = {
  children: PropTypes.node,
};

export default View;
