import * as React from "react";
import { get } from "lodash";
import Text from "../../components/Text";
import Card from "../../components/Card";
import NewTask from "../../components/NewTask";
import { Padding } from "../../components/Spacing";
import illustration from "./no_tasks.png";

interface Props {
  application: any;
  onNewTask: (e: React.SyntheticEvent) => void;
}

export default ({ onNewTask, application }: Props) => {
  let firstName = get(application, "specialist.firstName");
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
            You have no active tasks with {firstName}. Add a task to assign work
            to {firstName}
          </Text>
        </Padding>
        <NewTask onCreate={onNewTask} application={application} />
      </Padding>
    </Card>
  );
};
