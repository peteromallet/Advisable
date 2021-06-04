import * as React from "react";
import filter from "lodash/filter";
import { Box, Modal, useModal } from "@advisable/donut";
import { useApolloClient } from "@apollo/client";
import {
  useParams,
  useLocation,
  matchPath,
  useHistory,
} from "react-router-dom";
import NotFound from "../NotFound";
import Layout from "components/Layout";
import TaskDrawer from "components/TaskDrawer";
import useViewer from "src/hooks/useViewer";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import FlexibleTutorial from "components/Tutorial/FlexibleProjectTutorial";
import StoppedWorkingNotice from "./StoppedWorkingNotice";
import TASK_FIELDS from "../../graphql/fragments/task";

export default function Booking({ data, match }) {
  const viewer = useViewer();
  const client = useApolloClient();
  const location = useLocation();
  const history = useHistory();
  const { applicationId } = useParams();
  const tutorialModal = useModal({
    visible: viewer.completedTutorials.indexOf("flexible_projects") === -1,
  });

  // For fixed projects, if they haven't completed tthe fixed_projects tutorial then
  // we show the first task.
  React.useEffect(() => {
    if (data.application.projectType !== "Fixed") return;
    const completedFixedTutorial =
      viewer.completedTutorials.indexOf("fixed_projects") > -1;
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
    history.replace(`/manage/${data.application.id}/tasks/${sorted[0].id}`);
  }, []);

  let status = data?.application?.status;
  if (["Working", "Stopped Working"].indexOf(status) === -1) {
    return <NotFound />;
  }

  let application = data.application;
  let specialist = data?.application?.specialist;

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

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const handleDeleteTask = (task) => {
    client.cache.evict(client.cache.identify(task));
    history.push(match.url);
  };

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
