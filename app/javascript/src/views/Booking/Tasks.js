import * as React from "react";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";
import { Text, Tabs } from "@advisable/donut";
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";

export default ({ onNewTask, application, onSelectTask }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Text as="h4" size="l" padding="m" weight="medium" color="neutral.9">
        {t("tasks.title", application.specialist)}
      </Text>
      <Tabs tabListProps={{ pl: "m" }}>
        <Tabs.Tab title="Active Tasks" icon="list">
          <ActiveTasks
            onNewTask={onNewTask}
            application={application}
            onSelectTask={onSelectTask}
          />
        </Tabs.Tab>
        <Tabs.Tab title="Completed Tasks" icon="check-square">
          <CompletedTasks
            onNewTask={onNewTask}
            application={application}
            onSelectTask={onSelectTask}
          />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};
