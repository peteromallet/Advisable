// Renders the loaded state for when a freelancer is viewing an active
// application
import React from "react";
import { get } from "lodash";
import { Box } from "@advisable/donut";
import { matchPath } from "react-router-dom";
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

    history.push(match.url);
  };

  return (
    <>
      <TutorialComponent tutorial={tutorial} />
      <TaskDrawer
        isClient={false}
        showStatusNotice
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        readOnly={application.status !== "Working"}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Box display={{ m: "flex" }} maxWidth="1200px" mt="l" mx="auto">
        <Box maxWidth={{ m: "340px" }} width="100%" flexShrink="0">
          <Sidebar data={data} tutorial={tutorial} />
        </Box>
        <Box flexShrink="1" width="100%" ml={{ m: "40px" }}>
          {status === "Stopped Working" && (
            <Box mb="m">
              <StoppedWorkingNotice
                client={get(data, "application.project.user.companyName")}
              />
            </Box>
          )}
          <Tasks
            isClient={false}
            application={application}
            onClick={handleTaskClick}
            onCreate={addNewTaskToCache}
          />
        </Box>
      </Box>
    </>
  );
};

export default ActiveApplication;
