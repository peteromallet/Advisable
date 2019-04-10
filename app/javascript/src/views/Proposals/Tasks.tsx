import * as React from "react";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import { Padding } from "../../components/Spacing";
import graphqlClient from "../../graphqlClient";
import FETCH_TASK from "./fetchTask.graphql";
import FETCH_BOOKING from "./fetchBooking.graphql";

const Tasks = ({ application, match, booking, history }) => {
  const onSelectTask = task => {
    history.push(`${match.url}/${task.id}`);
  };

  const bookingQuery = {
    query: FETCH_BOOKING,
    variables: {
      id: match.params.bookingId
    }
  }

  const handleNewTask = task => {
    graphqlClient.cache.writeQuery({
      query: FETCH_TASK,
      variables: {
        id: task.id
      },
      data: {
        task
      }
    })

    const newData = graphqlClient.cache.readQuery(bookingQuery);
    newData.booking.tasks.push(task);
    graphqlClient.cache.writeQuery({
      ...bookingQuery,
      data: newData,
    })

    history.push(`${match.url}/${task.id}`)
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = graphqlClient.cache.readQuery(bookingQuery);
    newData.booking.tasks = booking.tasks.filter(t => {
      return t.id !== task.id
    })
    graphqlClient.cache.writeQuery({
      ...bookingQuery,
      data: newData,
    })
  }

  const handleContinue = () => {
    history.push("send")
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
        tasks={booking.tasks}
        onClickTask={onSelectTask}
      />
      {/* <TaskDrawer
        closeURL={match.url}
        bookingId={match.params.bookingId}
        onDeleteTask={handleDeleteTask}
      /> */}
      {booking.tasks.length > 0 && (
        <Padding size="l">
          <Button styling="primary" onClick={handleContinue}>Continue</Button>
        </Padding>
      )}
    </Card>
  );
};

export default Tasks
