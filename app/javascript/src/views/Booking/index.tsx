import * as React from "react";
import { find } from "lodash";
import Sticky from "react-stickynode";
import { Route } from "react-router-dom";
import Card from "../../components/Card";
import Task from "../../components/Task";
import Back from "../../components/Back";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";
import TaskDrawer from "../../components/TaskDrawer";
import { Skill, Detail, DetailLabel, DetailValue } from "./styles";

const tasks = [
  {
    id: "tas_1",
    status: "Not Assigned",
    name: "Write style guide for content voice and tone",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_2",
    status: "Quote Requested",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_3",
    status: "Quote Provided",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_4",
    status: "Assigned",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_5",
    status: "In Progress",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
  {
    id: "tas_6",
    status: "Pending Approval",
    name: "Write style guide for content voice and tone",
    dueDate: "2019-03-28",
    estimate: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, lacus eget aliquet tempus, leo enim sollicitudin leo, at sollicitudin ipsum felis eget leo. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis. Donec cursus risus et nisl ullamcorper, et dignissim ex ornare. Donec diam diam, pretium id risus quis, iaculis",
  },
];

export default ({ match, history }) => {
  const { bookingID } = match.params;

  const openTask = task => {
    history.replace(`/bookings/${bookingID}/tasks/${task.id}`);
  };

  const closeTask = () => {
    history.replace(match.url);
  };

  return (
    <>
      <Route
        path={`${match.path}/tasks/:taskId`}
        render={route => (
          <TaskDrawer
            isOpen={true}
            task={find(tasks, { id: route.match.params.taskId })}
            isClient={true}
            onClose={() => closeTask()}
          />
        )}
      />
      <Header />
      <Layout>
        <Layout.Sidebar size="s">
          <Sticky top={98}>
            <Padding bottom="l">
              <Back to="/">Back</Back>
            </Padding>
            <Padding bottom="l">
              <Avatar name="Thomas Cullen" size="l" />
            </Padding>
            <Padding bottom="l">
              <Heading>Thomas Cullen</Heading>
              <Skill>Search Engine Optimization</Skill>
            </Padding>
            <Padding bottom="xl">
              <Detail>
                <DetailLabel>Hourly Rate</DetailLabel>
                <DetailValue>€65</DetailValue>
              </Detail>
            </Padding>
            <ButtonGroup fullWidth>
              <Button styling="primary" onClick={() => {
                history.replace(`/bookings/${bookingID}/tasks/new`)
              }}>
                Add a task
              </Button>
            </ButtonGroup>
          </Sticky>
        </Layout.Sidebar>
        <Layout.Main>
          <Card>
            <Padding size="l" left="xl">
              <Heading>Active Tasks</Heading>
            </Padding>
            <Divider />
            <Padding bottom="m">
              {tasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onClick={() => openTask(task)}
                />
              ))}
            </Padding>
          </Card>
        </Layout.Main>
      </Layout>
    </>
  );
};
