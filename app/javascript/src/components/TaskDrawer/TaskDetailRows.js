import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Text, Icon, Link, Tooltip } from "@advisable/donut";

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
      width={20}
      height={20}
      mr="xs"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Icon icon={icon} color="blue.6" width={12} {...iconProps} />
    </Box>
    <Box flex={1}>
      <Text fontSize="xs" color="neutral.6" py="xs">
        {children}
      </Text>
    </Box>
    {tooltip && (
      <Box>
        <Tooltip content={tooltip} placement="bottom-end" interactable>
          <Box display="flex" alignItems="center">
            <Icon
              mr="xxs"
              width={18}
              color="neutral.4"
              strokeWidth={1.5}
              icon="help-circle"
            />
            <Text fontSize="xs" color="neutral.4">
              More info
            </Text>
          </Box>
        </Tooltip>
      </Box>
    )}
  </Box>
);

const TaskDetailRows = ({ isClient, task }) => {
  let details = [];
  const { t } = useTranslation();

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
              <Text fontSize="xxs" lineHeight="xs" color="white.8" mb="xs">
                {t(`trialProgram.tooltip.description.client`)}
              </Text>
              <Link
                as="a"
                target="_blank"
                onClick={e => e.stopPropagation()}
                href={"https://advisable.com/client-trial"}
              >
                Read more information
                <Icon icon="arrow-right" width={16} ml="xxs" />
              </Link>
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
