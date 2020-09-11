import * as React from "react";
import { get, filter } from "lodash-es";
import { Box, Modal, useModal } from "@advisable/donut";
import { useApolloClient } from "@apollo/client";
import {
  useParams,
  useLocation,
  matchPath,
  useHistory,
} from "react-router-dom";
import NotFound from "../NotFound";
import Layout from "../../components/Layout";
import TaskDrawer from "../../components/TaskDrawer";
import useViewer from "../../hooks/useViewer";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import GET_ACTIVE_APPLICATION from "./getActiveApplication";
import StoppedWorkingNotice from "./StoppedWorkingNotice";
import FlexibleTutorial from "../../components/Tutorial/FlexibleProjectTutorial";

export default function Booking({ data, match }) {
  const viewer = useViewer();
  const client = useApolloClient();
  const location = useLocation();
  const history = useHistory();
  const { applicationId } = useParams();
  const tutorialModal = useModal({
    visible: viewer.completedTutorials.indexOf("flexibleProjects") === -1,
  });

  let status = get(data, "application.status");
  if (["Working", "Stopped Working"].indexOf(status) === -1) {
    return <NotFound />;
  }

  let application = data.application;
  let specialist = get(data, "application.specialist");

  const openTask = (task) => {
    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const closeTask = () => {
    history.replace(match.url);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const addNewTaskToCache = (task) => {
    const existing = client.readQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
    });

    client.writeQuery({
      query: GET_ACTIVE_APPLICATION,
      data: {
        ...existing,
        application: {
          ...existing.application,
          tasks: [...existing.application.tasks, task],
        },
      },
      variables: {
        id: applicationId,
      },
    });

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
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

  // For fixed projects, if they haven't completed tthe fixedProjects tutorial then
  // we show the first task.
  React.useEffect(() => {
    if (data.application.projectType !== "Fixed") return;
    const completedFixedTutorial =
      viewer.completedTutorials.indexOf("fixedProjects") > -1;
    if (completedFixedTutorial) return;
    const tasks = filter(
      data.application.tasks,
      (task) =>
        ["Not Assigned", "Quote Provided", "Requested To Start"].indexOf(
          task.stage,
        ) > -1,
    );
    if (tasks.length === 0) return;
    const sorted = tasks.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    );
    history.replace(
      `/manage/${data.application.airtableId}/tasks/${sorted[0].id}`,
    );
  }, []);

  return (
    <>
      {data.application.projectType === "Flexible" && (
        <Modal
          modal={tutorialModal}
          hideOnClickOutside={false}
          showCloseButton={false}
          label="Project tutorial"
        >
          <FlexibleTutorial modal={tutorialModal} />
        </Modal>
      )}
      <TaskDrawer
        isClient
        showStatusNotice
        readOnly={application.status !== "Working"}
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        onCreateRepeatingTask={addNewTaskToCache}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
        projectType={data.application.projectType}
      />
      <Layout>
        <Sidebar data={data} tutorialModal={tutorialModal} />
        <Layout.Main>
          {status === "Stopped Working" && (
            <Box mb="m">
              <StoppedWorkingNotice
                firstName={specialist.firstName}
                application={data.application}
              />
            </Box>
          )}
          <Tasks
            onSelectTask={openTask}
            onNewTask={addNewTaskToCache}
            application={data.application}
          />
        </Layout.Main>
      </Layout>
    </>
  );
}
