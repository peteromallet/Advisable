import * as React from "react";
import { graphql } from "react-apollo";
import { match } from "react-router";
import { matchPath } from "react-router-dom";
import NotFound from "../../views/NotFound";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import TaskDrawer from "../../components/TaskDrawer";
import FETCH_BOOKING from "./fetchBooking.graphql";
import FETCH_TASK from "./fetchTask.graphql";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import { Location } from "history";
import graphqlClient from "../../graphqlClient";

interface Params {
  applicationId: string;
}

interface Props {
  match: match<Params>;
  history: any;
  data: any;
  location: Location
}

const Booking = ({ data, match, history, location }: Props) => {
  if (data.loading) return <Loading />;
  if (!data.application) return <NotFound />;
  if (data.application.status !== "Working") return <NotFound />

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
    path: `${match.path}/tasks/:taskId`
  })

  const addNewTaskToCache = task => {
    graphqlClient.cache.writeQuery({
      query: FETCH_TASK,
      variables: {
        id: task.id,
      },
      data: {
        task,
      },
    });

    const newData = data;
    newData.application.tasks.push(task);
    graphqlClient.cache.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: applicationId
      }
    })

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  }
  
  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = data
    newData.application.tasks = tasks.filter(t => {
      return t.id !== task.id;
    });
    graphqlClient.cache.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: applicationId
      }
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

export default graphql(FETCH_BOOKING, {
  options: (props: { match: match<Params> }) => ({
    variables: {
      id: props.match.params.applicationId,
    },
  }),
})(Booking);
