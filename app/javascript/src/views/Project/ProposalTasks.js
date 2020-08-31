import React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { Box, Text, theme } from "@advisable/donut";
import { Calendar, Time } from "@styled-icons/ionicons-outline";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import TaskDetailsModal from "./TaskDetailsModal";
import { displayTaskQuote } from "../../utilities/tasks";

const StyledTask = styled(DialogDisclosure)`
  border: none;
  outline: none;
  display: block;
  margin: 0 -12px;
  cursor: pointer;
  margin-top: -1px;
  appearance: none;
  text-align: left;
  user-select: none;
  padding: 16px 12px;
  border-radius: 12px;
  background: transparent;
  width: calc(100% + 24px);

  &:hover {
    background-color: ${theme.colors.neutral100};
  }
`;

const StyledTaskDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${theme.colors.neutral100};
`;

const StyledTaskList = styled.ul`
  border-top: 1px solid ${theme.colors.neutral100};
`;

function dueDate(task) {
  return DateTime.fromISO(task.dueDate).toFormat("dd MMM");
}

function TaskAttribute({ icon, label, value }) {
  return (
    <Box
      marginTop="8px"
      marginRight="16px"
      alignItems="center"
      display="inline-flex"
    >
      <Box color="neutral500" marginRight="6px">
        {React.cloneElement(icon, { size: 16 })}
      </Box>
      <Text fontSize="14px" color="neutral600" marginRight="4px">
        {label}:
      </Text>
      <Text fontSize="14px" color="neutral900">
        {value}
      </Text>
    </Box>
  );
}

export default function ProposalTasks({ tasks }) {
  const dialog = useDialogState();
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);

  return (
    <Box marginBottom="48px">
      <TaskDetailsModal dialog={dialog} id={selectedTaskId} />
      <Text
        color="neutral900"
        marginBottom="12px"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        Suggested Tasks
      </Text>
      <StyledTaskList>
        {tasks.map((task) => (
          <>
            <StyledTask
              {...dialog}
              onClick={() => setSelectedTaskId(task.id)}
              key={task.id}
            >
              <Text color="neutral900" fontSize="15px" lineHeight="18px">
                {task.name}
              </Text>
              {task.dueDate && (
                <TaskAttribute
                  icon={<Calendar />}
                  label="Due"
                  value={dueDate(task)}
                />
              )}
              {task.estimate && (
                <TaskAttribute
                  icon={<Time />}
                  label="Quote"
                  value={displayTaskQuote(task)}
                />
              )}
            </StyledTask>
            <StyledTaskDivider />
          </>
        ))}
      </StyledTaskList>
    </Box>
  );
}
