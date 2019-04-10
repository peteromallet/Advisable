import * as React from "react";
import Drawer from "../Drawer";
import { TaskDrawer } from "./styles";
import EditTask from "./EditTask";
import { Task } from "../../types";

type Props = {
  taskId?: string;
  onClose: () => void;
  onDeleteTask?: (task: Task) => void;
}

const Component = ({ taskId, onClose, onDeleteTask }: Props) => {
  return (
    <Drawer isOpen={Boolean(taskId)} onClose={onClose}>
      <TaskDrawer>
        <EditTask taskId={taskId} onDeleteTask={onDeleteTask} />
      </TaskDrawer>
    </Drawer>
  );
};

export default Component;
