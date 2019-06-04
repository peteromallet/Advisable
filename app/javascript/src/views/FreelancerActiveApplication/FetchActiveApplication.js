// Renders the loaded state for when a freelancer is viewing an active
// application
import React from "react";
import { matchPath } from "react-router-dom";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import FixedTutorial from "../../components/Tutorial/FixedProjectTutorial";
import FlexibleTutorial from "../../components/Tutorial/FlexibleProjectTutorial";
import { Padding } from "../../components/Spacing";
import Sidebar from "./Sidebar";
import NoTasks from "./NoTasks";
import FETCH_APPLICATION from "../../graphql/queries/freelancerActiveApplication";
import useTutorial from "../../hooks/useTutorial";

const tutorials = {
  Fixed: "fixedProjects",
  Flexible: "flexibleProjects",
};

const FetchActiveApplication = ({ location, history, match, data, client }) => {
  const application = data.application;

  const tutorial = useTutorial(tutorials[application.projectType], {
    client,
    autoStart: true,
  });

  const TutorialComponent =
    tutorial.name === "flexibleProjects" ? FlexibleTutorial : FixedTutorial;

  const handleTaskClick = task => {
    history.replace(`/clients/${application.airtableId}/tasks/${task.id}`);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const closeTask = () => {
    history.replace(match.url);
  };

  const addNewTaskToCache = task => {
    // Add the task to the application queries list of tasks
    client.writeQuery({
      query: FETCH_APPLICATION,
      variables: {
        id: application.airtableId,
      },
      data: {
        application: {
          ...data.application,
          tasks: [...data.application.tasks, task],
        },
      },
    });

    // open the task
    history.replace(`/clients/${application.airtableId}/tasks/${task.id}`);
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = data;
    newData.application.tasks = data.application.tasks.filter(t => {
      return t.id !== task.id;
    });

    client.writeQuery({
      query: FETCH_APPLICATION,
      data: newData,
      variables: {
        id: application.airtableId,
      },
    });
  };

  return (
    <Layout>
      <TutorialComponent tutorial={tutorial} />
      <TaskDrawer
        isClient={false}
        showStatusNotice
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Sidebar data={data} tutorial={tutorial} />
      <Layout.Main>
        {application.tasks.length > 0 ? (
          <Card elevation={1}>
            <Padding size="m" left="l" right="l">
              <Heading level={4}>Active Tasks</Heading>
            </Padding>
            <Padding bottom="m">
              <TaskList
                tasks={application.tasks}
                onClickTask={handleTaskClick}
                lastRow={
                  <NewTask
                    onCreate={addNewTaskToCache}
                    application={application}
                  />
                }
              />
            </Padding>
          </Card>
        ) : (
          <NoTasks onNewTask={addNewTaskToCache} application={application} />
        )}
      </Layout.Main>
    </Layout>
  );
};

export default FetchActiveApplication;
