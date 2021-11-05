// Renders the loaded state for when a freelancer is viewing an active
// application
import React from "react";
import { Box, Modal, useModal } from "@advisable/donut";
import {
  matchPath,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Layout from "components/Layout";
import TaskDrawer from "components/TaskDrawer";
import FixedTutorial from "components/Tutorial/FixedProjectTutorial";
import FlexibleTutorial from "components/Tutorial/FlexibleProjectTutorial";
import Sidebar from "./Sidebar";
import Tasks from "./Tasks";
import SetupPayments from "./SetupPayments";
import StoppedWorkingNotice from "./StoppedWorkingNotice";
import useViewer from "src/hooks/useViewer";
import TASK_FIELDS from "../../graphql/fragments/task";

const tutorials = {
  Fixed: "fixed_projects",
  Flexible: "flexible_projects",
};

const ActiveApplication = ({ data, client }) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const application = data.application;
  const tutorial = tutorials[application.projectType];
  const viewer = useViewer();
  const tutorialModal = useModal({
    visible: viewer.completedTutorials.indexOf(tutorial) === -1,
  });

  const status = data?.application?.status;
  let hasSetupPayments = data?.application?.specialist?.hasSetupPayments;
  if (!hasSetupPayments) {
    return <SetupPayments data={data} />;
  }

  const handleTaskClick = (task) => {
    history.replace(`/clients/${application.id}/tasks/${task.id}`);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const closeTask = () => {
    history.replace(match.url);
  };

  const addNewTaskToCache = (task) => {
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

    // open the task
    history.replace(`/clients/${params.applicationId}/tasks/${task.id}`);
  };

  const handleDeleteTask = (task) => {
    client.cache.evict(client.cache.identify(task));
    history.push(match.url);
  };

  return (
    <Layout>
      <Modal
        modal={tutorialModal}
        hideOnClickOutside={false}
        showCloseButton={false}
        label="Project tutorial"
      >
        {tutorial === "flexible_projects" ? (
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
              client={data?.application?.project?.user?.companyName}
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
