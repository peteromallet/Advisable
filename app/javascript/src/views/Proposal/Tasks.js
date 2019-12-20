import * as React from "react";
import { Button as DonutButton, Notice } from "@advisable/donut";
import { withApollo } from "react-apollo";
import { matchPath } from "react-router";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import Heading from "../../components/Heading";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import { Padding } from "../../components/Spacing";
import { useMobile } from "../../components/Breakpoint";
import FETCH_APPLICATION from "./fetchApplication";
import { hasCompleteTasksStep } from "./validationSchema";

const Tasks = ({ application, match, location, history, client }) => {
  const [confirmModal, setConfirmModal] = React.useState(false);
  const isMobile = useMobile();
  const onSelectTask = task => {
    history.push(`${match.url}/${task.id}`);
  };

  const applicationQuery = {
    query: FETCH_APPLICATION,
    variables: {
      id: application.airtableId,
    },
  };

  const handleNewTask = task => {
    const newData = client.readQuery(applicationQuery);
    newData.application.tasks.push(task);
    client.writeQuery({
      ...applicationQuery,
      data: newData,
    });

    history.push(`${match.url}/${task.id}`);
  };

  const handleDeleteTask = task => {
    const newData = client.readQuery(applicationQuery);
    newData.application.tasks = application.tasks.filter(t => {
      return t.id !== task.id;
    });
    client.writeQuery({
      ...applicationQuery,
      data: newData,
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

  const hasTasks = application.tasks.length > 0;
  // Wether or not the continue button should be visible
  const canContinue = hasCompleteTasksStep(application);

  const showPromptForTask = task => {
    return !Boolean(task.name) || !Boolean(task.description);
  };

  return (
    <Card>
      <Padding size="l">
        <Padding bottom="s">
          <Heading level={3}>Project Tasks</Heading>
        </Padding>
        <Text size="s">
          Tasks allow you and {application.project.user.companyName} to easily
          define and track the work that you would be doing throughout this
          project. Add at least one task that you would suggest for this
          project.
        </Text>
      </Padding>
      <TaskList
        hideStatus
        tasks={application.tasks}
        onClickTask={onSelectTask}
        showPromptForTask={showPromptForTask}
        lastRow={<NewTask onCreate={handleNewTask} application={application} />}
      />
      <TaskDrawer
        hideStatus
        onClose={() => history.push(match.url)}
        taskId={taskMatch ? taskMatch.params.taskId : null}
        onDeleteTask={handleDeleteTask}
      />
      <Modal isOpen={confirmModal} onClose={() => setConfirmModal(false)}>
        <Padding size="l">
          <Padding bottom="s">
            <Heading level={3}>You haven't proposed a trial task</Heading>
          </Padding>
          <Padding bottom="m">
            <Text size="s">
              Proposing a guaranteed trial task increases your chance of closing
              a client. To set one of your tasks as a trial task, click into the
              task and click "Set as trial task"
            </Text>
          </Padding>
          <DonutButton
            appearance="primary"
            intent="success"
            onClick={nextStep}
            mr="xs"
          >
            Continue without trial task
          </DonutButton>
          <DonutButton onClick={() => setConfirmModal(false)}>
            Cancel
          </DonutButton>
        </Padding>
      </Modal>
      {hasTasks && !canContinue && (
        <Padding size="l">
          <Notice icon="alert-triangle" title="More details required">
            Please add a name and description for each task to continue
          </Notice>
        </Padding>
      )}
      {canContinue && (
        <Padding size="l">
          <ButtonGroup fullWidth={isMobile}>
            <Button styling="primary" onClick={handleContinue}>
              Continue
            </Button>
          </ButtonGroup>
        </Padding>
      )}
    </Card>
  );
};

export default withApollo(Tasks);
