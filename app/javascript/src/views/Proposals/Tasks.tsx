import * as React from "react";
import { compose, graphql } from "react-apollo";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import { Padding } from "../../components/Spacing";
import graphqlClient from "../../graphqlClient";
import FETCH_BOOKING from "./fetchBooking.graphql";

const Tasks = ({ application, match, data, history }) => {
  if (data.loading) return <div>loading...</div>;

  const onSelectTask = task => {
    history.push(`${match.url}/${task.airtableId}`);
  };

  const handleNewTask = () => {
    history.push(`${match.url}/new`);
  };

  const addNewTaskToCache = task => {
    const newData = data;
    newData.booking.tasks.push(task);
    graphqlClient.cache.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: match.params.bookingId
      }
    })
  }

  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = data;
    newData.booking.tasks = data.booking.tasks.filter(t => {
      return t.id !== task.id
    })
    graphqlClient.cache.writeQuery({
      query: FETCH_BOOKING,
      data: newData,
      variables: {
        id: match.params.bookingId
      }
    })
  }

  return (
    <Card>
      <Padding size="l">
        <Padding bottom="s">
          <Heading level={3}>Project Tasks</Heading>
        </Padding>
        <Text size="s">
          Tasks allow you and {application.project.user.companyName} to easily
          define and track the work that you would be doing throughout this
          project. Add at least one task that you would suggest for this
          project.
        </Text>
      </Padding>
      <TaskList
        tasks={data.booking.tasks}
        onClickTask={onSelectTask}
        onNewTask={handleNewTask}
      />
      <TaskDrawer
        closeURL={match.url}
        onCreate={addNewTaskToCache}
        bookingId={match.params.bookingId}
        onDeleteTask={handleDeleteTask}
      />
      {data.booking.tasks.length > 0 && (
        <Padding size="l">
          <Button styling="primary">Continue</Button>
        </Padding>
      )}
    </Card>
  );
};

export default compose(
  graphql(FETCH_BOOKING, {
    options: (props: any) => ({
      variables: {
        id: props.match.params.bookingId,
      },
    }),
  })
)(Tasks);
