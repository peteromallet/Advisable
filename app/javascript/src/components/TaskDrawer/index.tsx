import * as React from "react";
import Drawer from "../Drawer";
import Status from "../Status";
import Scrollable from "../Scrollable";
import Padding from "../Spacing/Padding";
import VerticalLayout from "../VerticalLayout";
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
        <VerticalLayout>
          <VerticalLayout.Header>
            <Padding left="m" top="m" right="m">
              <Status>{task.status}</Status>
              <Title value={task.name} />
            </Padding>
          </VerticalLayout.Header>
          <VerticalLayout.Content>
            <Scrollable>
              <Padding left="m" bottom="m" right="m">
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
              </Padding>
            </Scrollable>
          </VerticalLayout.Content>
        </VerticalLayout>
      </TaskDrawer>
    </Drawer>
  );
};
