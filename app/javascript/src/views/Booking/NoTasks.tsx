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
};
