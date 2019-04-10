import * as React from "react";
import { graphql } from "react-apollo";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import TaskList from "../../components/TaskList";
import Message from "../../components/Message";
import TaskDrawer from "../../components/TaskDrawer";
import { Padding } from "../../components/Spacing";
import Sidebar from "./Sidebar";
import FETCH_BOOKING from "./fetchBooking.graphql";

const ViewProposal = ({ data }) => {
  const [selectedTask, setSelectedTask] = React.useState(null);
  if (data.loading) return <div>loading...</div>;

  const handleSelectTask = task => {
    setSelectedTask(task.id);
  };

  return (
    <>
      <Header />
      <Layout>
        <Sidebar data={data} />
        <Layout.Main>
          <Card>
            <Padding left="l" right="l" top="l" bottom="s">
              <Heading level={3}>
                Proposal for "{data.booking.application.project.primarySkill}"
              </Heading>
            </Padding>
            <Padding left="l" right="l" bottom="l">
              <Text size="s">
                Accepting this proposal wont assign any tasks. You’ll have the
                opportunity to assign and add tasks once you start working with
                Charlie. Once you assign a task, if you’re not happy with the
                quality of the work, we’ll give you a 100% refund for up to 8
                hours work.
              </Text>
            </Padding>
            {data.booking.proposalComment && (
              <Padding left="l" right="l" bottom="xl">
                <Message
                  title={`Message from ${
                    data.booking.application.specialist.firstName
                  }`}
                >
                  {data.booking.proposalComment}
                </Message>
              </Padding>
            )}
            <Padding left="l" bottom="m">
              <Text weight="semibold" colour="dark">
                Suggested tasks
              </Text>
              <Text size="xs">
                {data.booking.application.specialist.firstName} has suggested
                the following tasks for this project
              </Text>
            </Padding>
            <TaskDrawer
              taskId={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
            <TaskList
              hideStatus={true}
              tasks={data.booking.tasks}
              onClickTask={handleSelectTask}
            />
          </Card>
        </Layout.Main>
      </Layout>
    </>
  );
};

export default graphql(FETCH_BOOKING, {
  options: (props: any) => ({
    variables: {
      id: props.match.params.bookingId,
    },
  }),
})(ViewProposal);
