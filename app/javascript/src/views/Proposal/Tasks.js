import * as React from "react";
import { Box, Card, Button, Text } from "@advisable/donut";
import { useApolloClient } from "@apollo/client";
import { matchPath } from "react-router";
import Modal from "components/Modal";
import NewTask from "components/NewTask";
import TaskList from "components/TaskList";
import TaskDrawer from "components/TaskDrawer";
import TASK_FIELDS from "../../graphql/fragments/task";
import { hasCompleteTasksStep } from "./validationSchema";

const Tasks = ({ application, match, location, history }) => {
  const client = useApolloClient();
  const [confirmModal, setConfirmModal] = React.useState(false);
  const onSelectTask = (task) => {
    history.push(`${match.url}/${task.id}`);
  };

  const handleNewTask = (task) => {
    client.cache.modify({
      id: client.cache.identify(application),
      fields: {
        tasks(existingTasks, { readField }) {
          const taskRef = client.cache.writeFragment({
            data: task,
            fragment: TASK_FIELDS,
          });

          if (existingTasks.some((ref) => readField("id", ref) === task.id)) {
            return existingTasks;
          }

          return [...existingTasks, taskRef];
        },
      },
    });

    history.push(`${match.url}/${task.id}`);
  };

  const handleDeleteTask = (task) => {
    client.cache.modify({
      id: client.cache.identify(application),
      fields: {
        tasks(existingTasks, { readField }) {
          return existingTasks.filter(
            (ref) => task.id !== readField("id", ref),
          );
        },
      },
    });

    history.push(match.url);
  };

  const taskMatch = matchPath(location.pathname, {
    path: "*/tasks/:taskId",
  });

  const handleContinue = () => {
    if (application.trialProgram && !application.trialTask) {
      setConfirmModal(true);
    } else {
      nextStep();
    }
  };

  const nextStep = () => {
    history.push("send");
  };

  // Wether or not the continue button should be visible
  const canContinue = hasCompleteTasksStep(application);

  const showPromptForTask = (task) => {
    return !task.name || !task.description;
  };

  const noticeForTask = (task) => {
    if (!task.name) {
      return "Please provide a name for this task to continue.";
    }

    if (!task.description) {
      return "Please provide a description for this task to continue.";
    }
  };

  return (
    <Card borderRadius="12px">
      <Box padding={8}>
        <Text
          as="h2"
          fontSize="4xl"
          marginBottom={2}
          fontWeight="medium"
          letterSpacing="-0.03rem"
        >
          Project tasks
        </Text>
        <Text color="neutral800" lineHeight="1.2">
          Tasks allow you and {application.project.user.companyName} to easily
          define and track the work that you would be doing throughout this
          project. Add at least one task that you would suggest for this
          project.
        </Text>
      </Box>
      <TaskList
        hideStatus
        tasks={application.tasks}
        onClickTask={onSelectTask}
        showPromptForTask={showPromptForTask}
        lastRow={<NewTask onCreate={handleNewTask} application={application} />}
        notice={noticeForTask}
      />
      <TaskDrawer
        hideStatus
        onClose={() => history.push(match.url)}
        taskId={taskMatch ? taskMatch.params.taskId : null}
        onDeleteTask={handleDeleteTask}
      />
      <Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)}>
        <Box padding="l">
          <Text fontSize="2xl" fontWeight="medium" as="h3" marginBottom={2}>
            You haven&apos;t proposed a trial task
          </Text>
          <Text marginBottom={6} lineHeight="1.2">
            Proposing a guaranteed trial task increases your chance of closing a
            client. To set one of your tasks as a trial task, click into the
            task and click &quot;Set as trial task&quot;
          </Text>
          <Button type="button" onClick={nextStep} mr="xs">
            Continue without trial task
          </Button>
          <Button
            type="button"
            variant="subtle"
            onClick={() => setConfirmModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <Box padding="l">
        <Button type="button" onClick={handleContinue} disabled={!canContinue}>
          Continue
        </Button>
      </Box>
    </Card>
  );
};

export default Tasks;
