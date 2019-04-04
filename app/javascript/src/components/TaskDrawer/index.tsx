import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Drawer from "../Drawer";
import { TaskDrawer } from "./styles";
import NewTask from "./NewTask";
import EditTask from "./EditTask";

export default ({ isOpen, onClose, onCreate }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <TaskDrawer>
        <Switch>
          <Route
            path="/bookings/:bookingId/tasks/new"
            render={route => <NewTask {...route} onCreate={onCreate} />}
          />
          <Route
            path="/bookings/:bookingId/tasks/:taskId"
            component={EditTask}
          />
        </Switch>
      </TaskDrawer>
    </Drawer>
  );
};
