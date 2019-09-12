import React from "react";
import { Box, Text, Icon } from "@advisable/donut";

const Row = ({ icon, children, iconProps }) => (
  <Box
    py="xs"
    mx="xs"
    display="flex"
    alignItems="center"
    borderBottom="1px solid"
    borderColor="neutral.1"
  >
    <Box
      bg="neutral.1"
      borderRadius="50%"
      width={18}
      height={18}
      mr="xs"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon icon={icon} color="neutral.6" width={12} {...iconProps} />
    </Box>
    <Text fontSize="xs" color="neutral.7" py="xxs">
      {children}
    </Text>
  </Box>
);

const TaskDetailRows = ({ task }) => {
  let details = [];

  if (task.repeat) {
    details.push(
      <Row key="repeat" icon="refresh-cw">
        This is a repeating task
      </Row>
    );
  }

  if (task.trial) {
    details.push(
      <Row
        key="trial"
        icon="star"
        iconProps={{ fill: "currentColor", strokeWidth: 0 }}
      >
        This task has been offered as a guaranteed trial
      </Row>
    );
  }

  return details;
};

export default TaskDetailRows;
