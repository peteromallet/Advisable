// Renders the loaded state for when a freelancer is viewing an active
// application
import React from "react";
import { get } from "lodash-es";
import { Box, Modal, useModal } from "@advisable/donut";
import { matchPath } from "react-router-dom";
import Layout from "../../components/Layout";
import TaskDrawer from "../../components/TaskDrawer";
import FixedTutorial from "../../components/Tutorial/FixedProjectTutorial";
import FlexibleTutorial from "../../components/Tutorial/FlexibleProjectTutorial";
import Sidebar from "./Sidebar";
import FETCH_APPLICATION from "./fetchApplication";
import Tasks from "./Tasks";
import SetupPayments from "./SetupPayments";
import StoppedWorkingNotice from "./StoppedWorkingNotice";
import useViewer from "../../hooks/useViewer";

const tutorials = {
  Fixed: "fixedProjects",
  Flexible: "flexibleProjects",
};

const ActiveApplication = ({ location, history, match, data, client }) => {
  const application = data.application;
  const tutorial = tutorials[application.projectType];
  const viewer = useViewer();
  const tutorialModal = useModal({
    visible: viewer.completedTutorials.indexOf(tutorial) === -1,
  });

  const status = get(data, "application.status");
  let hasSetupPayments = get(data, "application.specialist.hasSetupPayments");
  if (!hasSetupPayments) {
    return <SetupPayments data={data} />;
  }

  const handleTaskClick = (task) => {
    history.replace(`/clients/${application.airtableId}/tasks/${task.id}`);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const closeTask = () => {
    history.replace(match.url);
  };

  const addNewTaskToCache = (task) => {
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

  const handleDeleteTask = (task) => {
    let newData = client.readQuery({
      query: FETCH_APPLICATION,
      variables: {
        id: application.airtableId,
      },
    });

    newData.application.tasks = data.application.tasks.filter((t) => {
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
    <Layout>
      <Modal
        modal={tutorialModal}
        hideOnClickOutside={false}
        showCloseButton={false}
      >
        {tutorial === "flexibleProjects" ? (
          <FlexibleTutorial modal={tutorialModal} />
        ) : (
          <FixedTutorial modal={tutorialModal} />
        )}
      </Modal>
      <TaskDrawer
        isClient={false}
        showStatusNotice
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        readOnly={application.status !== "Working"}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Sidebar data={data} tutorial={tutorial} tutorialModal={tutorialModal} />
      <Layout.Main>
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
      </Layout.Main>
    </Layout>
  );
};

export default ActiveApplication;
