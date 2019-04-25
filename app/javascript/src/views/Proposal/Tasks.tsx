import * as React from "react";
import { matchPath } from "react-router";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import Heading from "../../components/Heading";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import { Padding } from "../../components/Spacing";
import graphqlClient from "../../graphqlClient";
import { useMobile } from "../../components/Breakpoint";
import FETCH_TASK from "./fetchTask.graphql";
import FETCH_APPLICATION from "./fetchApplication.graphql";

const Tasks = ({ application, match, location, history }) => {
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
    graphqlClient.cache.writeQuery({
      query: FETCH_TASK,
      variables: {
        id: task.id,
      },
      data: {
        task,
      },
    });

    const newData = graphqlClient.cache.readQuery(applicationQuery);
    newData.application.tasks.push(task);
    graphqlClient.cache.writeQuery({
      ...applicationQuery,
      data: newData,
    });

    history.push(`${match.url}/${task.id}`);
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = graphqlClient.cache.readQuery(applicationQuery);
    newData.application.tasks = application.tasks.filter(t => {
      return t.id !== task.id;
    });
    graphqlClient.cache.writeQuery({
      ...applicationQuery,
      data: newData,
    });
  };

  const taskMatch: any = matchPath(location.pathname, {
    path: "*/tasks/:taskId",
  });

  const handleContinue = () => {
    history.push("send");
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
        lastRow={<NewTask onCreate={handleNewTask} application={application} />}
      />
      <TaskDrawer
        hideStatus
        onClose={() => history.push(match.url)}
        taskId={taskMatch ? taskMatch.params.taskId : null}
        onDeleteTask={handleDeleteTask}
      />
      {application.tasks.length > 0 && (
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

export default Tasks;
