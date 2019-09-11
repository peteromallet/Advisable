import React from "react";
import { Text, Tabs } from "@advisable/donut";
import Card from "../../components/Card";
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";

// Renders the tasks inside the freelancer active project view.
const Tasks = props => {
  return (
    <Card elevation={1}>
      <Text as="h4" size="xl" padding="m" weight="medium" color="neutral.9">
        My Tasks
      </Text>
      <Tabs tabListProps={{ pl: "m" }}>
        <Tabs.Tab title="Active Tasks">
          <ActiveTasks {...props} />
        </Tabs.Tab>
        <Tabs.Tab title="Completed Tasks">
          <CompletedTasks {...props} />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default Tasks;
