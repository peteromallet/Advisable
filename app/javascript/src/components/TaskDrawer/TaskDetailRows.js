import React from "react";
import Tooltip from "../Tooltip";
import { Box, Text, Icon } from "@advisable/donut";

const Row = ({ icon, children, iconProps, tooltip }) => (
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
    <Box flex={1}>
      <Text fontSize="xs" color="neutral.7" py="xxs">
        {children}
      </Text>
    </Box>
    {tooltip && (
      <Box>
        <Tooltip content={tooltip}>
          <Text fontSize="xs" color="neutral.4">
            More info
          </Text>
        </Tooltip>
      </Box>
    )}
  </Box>
);

const TaskDetailRows = ({ isClient, task }) => {
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
        tooltip={
          isClient && (
            <>
              Advisable offers clients a risk-free trial period of up to 8 hours
              when working with a new freelancer. If you're not entirely
              satisfied during this period, you will not be charged for any work
              done and we will find you a replacement freelancer free of charge.
              The only requirement is that you provide us with feedback as per
              Advisable's Professional Standards.
            </>
          )
        }
      >
        This task has been offered as a guaranteed trial
      </Row>
    );
  }

  return details;
};

export default TaskDetailRows;
