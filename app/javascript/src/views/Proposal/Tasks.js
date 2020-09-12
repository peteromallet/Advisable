import * as React from "react";
import { Box, Card, Button } from "@advisable/donut";
import { useApolloClient } from "@apollo/client";
import { matchPath } from "react-router";
import Text from "../../components/Text";
import Modal from "../../components/Modal";
import Heading from "../../components/Heading";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import FETCH_APPLICATION from "./fetchApplication";
import { hasCompleteTasksStep } from "./validationSchema";

const Tasks = ({ application, match, location, history }) => {
  const client = useApolloClient();
  const [confirmModal, setConfirmModal] = React.useState(false);
  const onSelectTask = (task) => {
    history.push(`${match.url}/${task.id}`);
  };

  const applicationQuery = {
    query: FETCH_APPLICATION,
    variables: {
      id: application.id,
    },
  };

  const handleNewTask = (task) => {
    const newData = client.readQuery(applicationQuery);
    client.writeQuery({
      ...applicationQuery,
      data: {
        ...newData,
        application: {
          ...newData.application,
          tasks: [...newData.application.tasks, task],
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
          return existingTasks.filter((taskRef) => {
            return task.id !== readField("id", taskRef);
          });
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
    <Card>
      <Box padding="l">
        <Box paddingBottom="s">
          <Heading level={3}>Project Tasks</Heading>
        </Box>
        <Text size="s">
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
          <Box paddingBottom="s">
            <Heading level={3}>You haven&apos;t proposed a trial task</Heading>
          </Box>
          <Box paddingBottom="m">
            <Text size="s">
              Proposing a guaranteed trial task increases your chance of closing
              a client. To set one of your tasks as a trial task, click into the
              task and click &quot;Set as trial task&quot;
            </Text>
          </Box>
          <Button onClick={nextStep} mr="xs">
            Continue without trial task
          </Button>
          <Button variant="subtle" onClick={() => setConfirmModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Box padding="l">
        <Button onClick={handleContinue} disabled={!canContinue}>
          Continue
        </Button>
      </Box>
    </Card>
  );
};

export default Tasks;
