// Renders the loaded state for when a freelancer is viewing an active
// application
import React from "react";
import { get } from "lodash";
import { Box } from "@advisable/donut";
import { matchPath } from "react-router-dom";
import Layout from "../../components/Layout";
import TaskDrawer from "../../components/TaskDrawer";
import FixedTutorial from "../../components/Tutorial/FixedProjectTutorial";
import FlexibleTutorial from "../../components/Tutorial/FlexibleProjectTutorial";
import Sidebar from "./Sidebar";
import FETCH_APPLICATION from "./fetchApplication";
import useTutorial from "../../hooks/useTutorial";
import Tasks from "./Tasks";
import SetupPayments from "./SetupPayments";
import StoppedWorkingNotice from "./StoppedWorkingNotice";

const tutorials = {
  Fixed: "fixedProjects",
  Flexible: "flexibleProjects",
};

const ActiveApplication = ({ location, history, match, data, client }) => {
  const application = data.application;

  const tutorial = useTutorial(tutorials[application.projectType], {
    client,
    autoStart: true,
  });

  const status = get(data, "application.status");
  let hasSetupPayments = get(data, "application.specialist.hasSetupPayments");
  if (!hasSetupPayments) {
    return <SetupPayments data={data} />;
  }

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
    let newData = client.readQuery({
      query: FETCH_APPLICATION,
      variables: {
        id: application.airtableId,
      },
    });

    // Add the task to the application queries list of tasks
    client.writeQuery({
      query: FETCH_APPLICATION,
      variables: {
        id: application.airtableId,
      },
      data: {
        ...newData,
        application: {
          ...newData.application,
          tasks: [...newData.application.tasks, task],
        },
      },
    });

    // open the task
    history.replace(`/clients/${application.airtableId}/tasks/${task.id}`);
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    let newData = client.readQuery({
      query: FETCH_APPLICATION,
      variables: {
        id: application.airtableId,
      },
    });

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
        {status === "Stopped Working" && (
          <Box mb="m">
            <StoppedWorkingNotice />
          </Box>
        )}
        <Tasks
          application={application}
          onClick={handleTaskClick}
          onCreate={addNewTaskToCache}
        />
      </Layout.Main>
    </Layout>
  );
};

export default ActiveApplication;
