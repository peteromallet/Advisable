import * as React from "react";
import { Switch, Route, withRouter, matchPath } from "react-router-dom";
import Drawer from "../Drawer";
import { TaskDrawer } from "./styles";
import NewTask from "./NewTask";
import EditTask from "./EditTask";

const Component = ({
  onCreate,
  location,
  closeURL,
  history,
  bookingId,
}: any) => {
  const taskDrawerPath = matchPath(location.pathname, {
    path: `*/tasks/:taskId`,
  });

  const handleClose = () => {
    history.replace(closeURL);
  };

  return (
    <Drawer isOpen={Boolean(taskDrawerPath)} onClose={handleClose}>
      <TaskDrawer>
        <Switch>
          <Route
            path="*/tasks/new"
            render={route => (
              <NewTask {...route} bookingId={bookingId} onCreate={onCreate} />
            )}
          />
          <Route
            path="*/tasks/:taskId"
            render={props => <EditTask {...props} bookingId={bookingId} />}
          />
        </Switch>
      </TaskDrawer>
    </Drawer>
  );
};

export default withRouter(Component);
