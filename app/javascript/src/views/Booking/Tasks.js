import * as React from "react";
import { List, CheckSquare } from "@styled-icons/feather";
import { useTranslation } from "react-i18next";
import { Text, Tabs, Card } from "@advisable/donut";
import ActiveTasks from "./ActiveTasks";
import CompletedTasks from "./CompletedTasks";

export default function Tasks({ onNewTask, application, onSelectTask }) {
  const { t } = useTranslation();

  return (
    <Card>
      <Text as="h4" size="l" padding="m" weight="medium" color="neutral900">
        {t("tasks.title", application.specialist)}
      </Text>
      <Tabs label="Tasks" tabListProps={{ pl: "m" }}>
        <Tabs.Tab
          title="Active Projects"
          icon={<List size={18} strokeWidth={1.5} />}
        >
          <ActiveTasks
            onNewTask={onNewTask}
            application={application}
            onSelectTask={onSelectTask}
          />
        </Tabs.Tab>
        <Tabs.Tab
          title="Completed Projects"
          icon={<CheckSquare size={18} strokeWidth={1.5} />}
        >
          <CompletedTasks
            onNewTask={onNewTask}
            application={application}
            onSelectTask={onSelectTask}
          />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
}
