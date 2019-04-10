import * as React from "react";
import Sticky from "react-stickynode";
import { graphql } from "react-apollo";
import { match } from "react-router";
import { matchPath } from "react-router-dom";
import Back from "../../components/Back";
import Text from "../../components/Text";
import NotFound from "../../views/NotFound";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import { Padding } from "../../components/Spacing";
import TaskDrawer from "../../components/TaskDrawer";
import AttributeList from "../../components/AttributeList";
import FETCH_BOOKING from "./fetchBooking.graphql";
import Tasks from "./Tasks";
import { Location } from "history";
import graphqlClient from "../../graphqlClient";

interface Params {
  bookingID: string;
}

interface Props {
  match: match<Params>;
  history: any;
  data: any;
  location: Location
}

const Booking = ({ data, match, history, location }: Props) => {
  if (data.loading) return <Loading />;
  if (!data.booking) return <NotFound />;

  const { bookingID } = match.params;
  const tasks = data.booking.tasks;
  const specialist = data.booking.application.specialist;

  const openTask = task => {
    history.replace(`/bookings/${bookingID}/tasks/${task.airtableId}`);
  };

  const newTask = () => {
    history.replace(`/bookings/${bookingID}/tasks/new`);
  };

  const closeTask = () => {
    history.replace(match.url);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks`
  })

  const addNewTaskToCache = task => {
    const newData = data;
    newData.booking.tasks.push(task);
    graphqlClient.cache.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: bookingID
      }
    })
  }

  return (
    <>
      {/* <TaskDrawer
        isOpen={Boolean(taskDrawerPath)}
        onClose={() => closeTask()}
        onCreate={addNewTaskToCache}
      /> */}
      <Header />
      <Layout>
        <Layout.Sidebar>
          <Sticky top={98}>
            <Padding bottom="l">
              <Back to="/">Back</Back>
            </Padding>
            <Padding bottom="l">
              <Avatar name="Thomas Cullen" size="l" />
            </Padding>
            <Padding bottom="l">
              <Heading>Thomas Cullen</Heading>
              <Text>Search Engine Optimization</Text>
            </Padding>
            <Padding bottom="xl">
              <AttributeList>
                <AttributeList.Item label="Hourly Rate" value="€64" />
              </AttributeList>
            </Padding>
          </Sticky>
        </Layout.Sidebar>
        <Layout.Main>
          <Tasks
            tasks={tasks}
            onNewTask={newTask}
            onSelectTask={openTask}
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
      id: props.match.params.bookingID,
    },
  }),
})(Booking);
