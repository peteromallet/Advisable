import * as React from "react";
import { graphql, withApollo } from "react-apollo";
import { matchPath } from "react-router-dom";
import NotFound from "../NotFound";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import TaskDrawer from "../../components/TaskDrawer";
import FETCH_BOOKING from "./fetchBooking.graphql";
import FETCH_TASK from "./fetchTask.graphql";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";

let Booking = ({ data, match, history, location, client }) => {
  if (data.loading) return <Loading />;
  if (!data.application) return <NotFound />;
  if (data.application.status !== "Working") return <NotFound />;

  const { applicationId } = match.params;
  const tasks = data.application.tasks;
  const specialist = data.application.specialist;

  const openTask = task => {
    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const closeTask = () => {
    history.replace(match.url);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const addNewTaskToCache = task => {
    const newData = data;
    newData.application.tasks.push(task);
    client.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: applicationId,
      },
    });

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = data;
    newData.application.tasks = tasks.filter(t => {
      return t.id !== task.id;
    });
    client.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: applicationId,
      },
    });
  };

  return (
    <>
      <TaskDrawer
        showStatusNotice
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        isClient={data.viewer.__typename === "User"}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Layout>
        <Sidebar data={data} />
        <Layout.Main>
          <Tasks
            tasks={tasks}
            onNewTask={addNewTaskToCache}
            onSelectTask={openTask}
            application={data.application}
            firstName={specialist.firstName}
          />
        </Layout.Main>
      </Layout>
    </>
  );
};

Booking = withApollo(Booking);

Booking = graphql(FETCH_BOOKING, {
  options: props => ({
    variables: {
      id: props.match.params.applicationId,
    },
  }),
})(Booking);

export default Booking;
