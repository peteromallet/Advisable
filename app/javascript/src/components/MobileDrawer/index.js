import React from "react";
import Navigation from "src/components/Navigation";
import { Drawer, Mask } from "./styles";

export default props => (
  <React.Fragment>
    <Drawer open={props.open}>
      <Navigation onNavigate={props.toggleDrawer} />
    </Drawer>
    <Mask open={props.open} onClick={props.toggleDrawer} />
  </React.Fragment>
);
