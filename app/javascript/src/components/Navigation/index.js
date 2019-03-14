// This component was built specifically for the candidates view. If you want to
// add a sidebar menu you should use the NavigationMenu component.
// Eventually this component should be removed and the candidates view should be
// updated to use the NavigationMenu component.
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
