import React from "react";
import { Container } from "@advisable/donut";
import { Switch, Route, Redirect } from "react-router-dom";
import useViewer from "../../hooks/useViewer";
import Complete from "./Complete";
import NewApplication from "./NewApplication";
import EditApplication from "./EditApplication";

function FullApplication() {
  const viewer = useViewer();
  const onHold = viewer.applicationStage === "On Hold";

  if (viewer.applicationStage === "Accepted") {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="750px" py="40px">
      <Switch>
        <Route path="/apply/complete">
          <Complete />
        </Route>
        <Route path="/apply">
          {onHold ? <NewApplication /> : <EditApplication />}
        </Route>
      </Switch>
    </Container>
  );
}

export default FullApplication;
