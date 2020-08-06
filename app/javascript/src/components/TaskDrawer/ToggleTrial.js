import React from "react";
import { gql } from "@apollo/client";
import { Menu } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { MenuItem } from "reakit";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Text, Button, Box } from "@advisable/donut";
import { DrawerModal } from "../Drawer";
import UPDATE_TASK from "./setTaskTrial";

const ToggleWithConfirmation = React.forwardRef(
  ({ trialTask, title, handleUpdate, ...props }, ref) => {
    const dialog = useDialogState();

    return (
      <>
        <DialogDisclosure
          ref={ref}
          title={title}
          {...dialog}
          {...props}
          as={Menu.Item}
        />
        <DrawerModal
          dialog={dialog}
          aria-label="You can only have one trial task. Marking this as a trial task will remove your existing trial offer."
        >
          <Box padding="l">
            <Text textAlign="center">
              <Text mb="xs" fontWeight="medium">
                You can only have one trial task
              </Text>
              <Text mb="l" size="xs" lineHeight="xs" color="neutral.7">
                Marking this as a trial task will remove the existing trial
                offer from the task "{trialTask.name}"
              </Text>
              <Button onClick={handleUpdate} size="s" mr="xxs">
                Okay
              </Button>
              <Button onClick={dialog.hide} size="s" ml="xxs" variant="subtle">
                Cancel
              </Button>
            </Text>
          </Box>
        </DrawerModal>
      </>
    );
  },
);

const ToggleTrial = ({ onToggle, task, menu }) => {
  const { t } = useTranslation();
  const [updateTask] = useMutation(UPDATE_TASK, {
    // We need to manually update the cache to update any existing trialTask
    update(cache) {
      if (task.application.trialTask) {
        cache.writeFragment({
          id: `Task:${task.application.trialTask.id}`,
          fragment: gql`
            fragment task on Task {
              trial
            }
          `,
          data: {
            __typename: "Task",
            trial: false,
          },
        });
      }
    },
  });

  const trialTask = task.application.trialTask;
  const allowedStages = [
    "Not Assigned",
    "Quote Requested",
    "QuoteProvided",
    "Requested To Start",
  ];
  if (trialTask && allowedStages.indexOf(trialTask.stage) === -1) {
    return null;
  }

  const handleUpdate = () => {
    const trial = !task.trial;
    const optimisticResponse = {
      __typename: "Mutation",
      updateTask: {
        __typename: "UpdateTaskPayload",
        task: {
          __typename: "Task",
          ...task,
          trial,
          application: {
            ...task.application,
            trialTask: trial ? task : null,
          },
        },
        errors: null,
      },
    };

    if (!task.trial) {
      updateTask({
        variables: {
          input: { id: task.id, trial: true },
        },
        optimisticResponse,
      });
    }

    if (task.trial) {
      updateTask({
        variables: {
          input: { id: task.id, trial: false },
        },
        optimisticResponse,
      });
    }

    onToggle();
  };

  let title;
  if (task.trial) {
    title = t("actions.removeTaskTrial");
  } else {
    title = t("actions.markTaskAsTrial");
  }

  return (
    <>
      {trialTask && trialTask.id !== task.id ? (
        <MenuItem
          {...menu}
          title={title}
          trialTask={trialTask}
          as={ToggleWithConfirmation}
          handleUpdate={handleUpdate}
        />
      ) : (
        <Menu.Item title={title} onClick={handleUpdate} />
      )}
    </>
  );
};

export default ToggleTrial;
