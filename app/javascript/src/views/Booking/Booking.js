import * as React from "react";
import { get } from "lodash";
import { Box } from "@advisable/donut";
import { useApolloClient } from "@apollo/react-hooks";
import {
  useParams,
  useLocation,
  matchPath,
  useHistory,
} from "react-router-dom";
import NotFound from "../NotFound";
import Layout from "../../components/Layout";
import TaskDrawer from "../../components/TaskDrawer";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import FixedTutorial from "../../components/Tutorial/FixedProjectTutorial";
import FlexibleTutorial from "../../components/Tutorial/FlexibleProjectTutorial";
import useTutorial from "../../hooks/useTutorial";
import GET_ACTIVE_APPLICATION from "./getActiveApplication";
import StoppedWorkingNotice from "./StoppedWorkingNotice";

const tutorials = {
  Fixed: "fixedProjects",
  Flexible: "flexibleProjects",
};

export default function Booking({ data, match }) {
  const client = useApolloClient();
  const location = useLocation();
  const history = useHistory();
  const { applicationId } = useParams();

  const tutorial = useTutorial(tutorials[data.application.projectType], {
    autoStart: true,
  });

  let status = get(data, "application.status");
  if (["Working", "Stopped Working"].indexOf(status) === -1) {
    return <NotFound />;
  }

  let application = data.application;
  let specialist = get(data, "application.specialist");

  const TutorialComponent =
    tutorial.name === "flexibleProjects" ? FlexibleTutorial : FixedTutorial;

  const tasks = data.application.tasks;

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
    const newData = client.readQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
    });
    newData.application.tasks.push(task);
    client.writeQuery({
      query: GET_ACTIVE_APPLICATION,
      data: newData,
      variables: {
        id: applicationId,
      },
    });

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const handleDeleteTask = (task) => {
    const newData = client.readQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
    });
    history.push(match.url);
    client.writeQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
      data: {
        ...newData,
        application: {
          ...newData.application,
          tasks: tasks.filter((t) => {
            return t.id !== task.id;
          }),
        },
      },
    });
  };

  return (
    <>
      <TutorialComponent tutorial={tutorial} isClient />
      <TaskDrawer
        isClient
        showStatusNotice
        readOnly={application.status !== "Working"}
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        onCreateRepeatingTask={addNewTaskToCache}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Layout>
        <Sidebar data={data} tutorial={tutorial} />
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
