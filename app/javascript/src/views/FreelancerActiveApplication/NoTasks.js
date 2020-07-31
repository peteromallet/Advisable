import React from "react";
import { Card } from "@advisable/donut";
import Text from "../../components/Text";
import NewTask from "../../components/NewTask";
import { Padding } from "../../components/Spacing";
import illustration from "../../illustrations/relax.png";

export default function NoTasks({ onNewTask, application }) {
  return (
    <Card>
      <Padding size="xxl" style={{ textAlign: "center" }}>
        <img src={illustration} width={300} />
        <Padding bottom="xs">
          <Text weight="semibold" colour="dark">
            No active tasks
          </Text>
        </Padding>
        <Padding bottom="l">
          <Text
            size="s"
            style={{
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            You have no active tasks with {application.project.user.companyName}
            .
          </Text>
        </Padding>
        <NewTask onCreate={onNewTask} application={application} />
      </Padding>
    </Card>
  );
}
