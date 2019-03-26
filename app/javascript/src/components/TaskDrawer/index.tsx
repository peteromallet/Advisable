import * as React from "react";
import Drawer from "../Drawer";
import Status from "../Status";
import Title from "./Title";
import Description from "./Description";
import {
  TaskDrawer,
  TaskDetails,
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
} from "./styles";

export default ({ isOpen, onClose, task, isClient }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <TaskDrawer>
        <Status>{task.status}</Status>
        <Title value={task.name} />
        <TaskDetails>
          <Detail>
            <DetailIcon />
            <DetailLabel>Due Date</DetailLabel>
            <DetailValue>29 April 2019</DetailValue>
          </Detail>
          {task.estimate && (
            <Detail>
              <DetailIcon />
              <DetailLabel>Estimate</DetailLabel>
              <DetailValue>{task.estimate}</DetailValue>
            </Detail>
          )}
        </TaskDetails>
        <Description task={task} />
      </TaskDrawer>
    </Drawer>
  );
};
