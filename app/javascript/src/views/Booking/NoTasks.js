import * as React from "react";
import { get } from "lodash-es";
import { Card } from "@advisable/donut";
import Text from "../../components/Text";
import NewTask from "../../components/NewTask";
import { Padding } from "../../components/Spacing";
import illustration from "./no_tasks.png";

export default function NoTasks({ onNewTask, application }) {
  let firstName = get(application, "specialist.firstName");

  return (
    <Card>
      <Padding size="xxl" style={{ textAlign: "center" }}>
        <img src={illustration} width={300} />
        <Padding bottom="xs">
          <Text weight="semibold" colour="dark">
            No active projects
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
            You must now assign a project in order for {firstName} to start
            work.
          </Text>
        </Padding>
        <NewTask onCreate={onNewTask} application={application} />
      </Padding>
    </Card>
  );
}
