import React from "react";
import { Route } from "react-router-dom";
import { Nav } from "./styles";
import ProjectStatuses from "./ProjectStatuses";

const Navigation = ({ toggleDrawer, drawerOpen, onNavigate }) => {
  return (
    <Nav>
      <Route
        path="/projects/:projectID"
        render={props => <ProjectStatuses {...props} onNavigate={onNavigate} />}
      />
    </Nav>
  );
};

export default Navigation;
