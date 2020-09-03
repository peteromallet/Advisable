import React from "react";
import { displayTaskQuote, displayTaskDueDate } from "../../utilities/tasks";
import ActionBarModal from "./ActionBarModal";
import { Calendar, Time } from "@styled-icons/ionicons-outline";
import { Circle, Box, Text, Skeleton, Paragraph } from "@advisable/donut";
import { useTask } from "./queries";
import renderLineBreaks from "../../utilities/renderLineBreaks";

export default function TaskDetailsModal({ dialog, id }) {
  const { loading, data } = useTask({
    variables: { id },
    skip: !dialog.visible,
  });

  const task = data?.task;

  return (
    <ActionBarModal width={700} dialog={dialog}>
      {loading && <Skeleton height={24} width="100%" />}
      {!loading && task && (
        <>
          <Text
            fontSize="3xl"
            fontWeight="medium"
            letterSpacing="-0.03em"
            color="neutral900"
            marginBottom="24px"
          >
            {task.name}
          </Text>
          <Box height={1} bg="neutral100" />
          <Box display="flex" paddingY="12px" alignItems="center">
            <Box display="flex" alignItems="center" marginRight="40px">
              <Circle
                size="40px"
                bg="neutral100"
                color="blue900"
                marginRight="12px"
              >
                <Calendar size="24px" />
              </Circle>
              <Box>
                <Text
                  fontSize="14px"
                  color="neutral500"
                  marginBottom="2px"
                  fontWeight="medium"
                  letterSpacing="-0.02em"
                >
                  Due Date
                </Text>
                <Text
                  fontWeight="medium"
                  letterSpacing="-0.02em"
                  color="neutral900"
                >
                  {displayTaskDueDate(task)}
                </Text>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Circle
                size="40px"
                bg="neutral100"
                color="blue900"
                marginRight="12px"
              >
                <Time size="24px" />
              </Circle>
              <Box>
                <Text
                  fontSize="14px"
                  color="neutral500"
                  marginBottom="2px"
                  fontWeight="medium"
                  letterSpacing="-0.02em"
                >
                  Quote
                </Text>
                <Text
                  fontWeight="medium"
                  letterSpacing="-0.02em"
                  color="neutral900"
                >
                  {displayTaskQuote(task)}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box height={1} bg="neutral100" marginBottom="24px" />
          <Paragraph autoLink>{renderLineBreaks(task.description)}</Paragraph>
        </>
      )}
    </ActionBarModal>
  );
}
