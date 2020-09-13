import React from "react";
import { Text, Tabs, Card } from "@advisable/donut";
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";

// Renders the tasks inside the freelancer active project view.
const Tasks = (props) => {
  return (
    <Card>
      <Text as="h4" size="xl" padding="m" weight="medium" color="neutral900">
        My Tasks
      </Text>
      <Tabs label="Tasks" tabListProps={{ pl: "m" }}>
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
