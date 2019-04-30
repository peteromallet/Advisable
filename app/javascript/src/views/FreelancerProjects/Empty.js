// Loads the empty state for the manage talent view
import React from "react";
import Text from "../../components/Text";
import Card from "../../components/Card";
import { Padding } from "../../components/Spacing";
import illustration from "./illustration.png";

export default () => {
  return (
    <Card style={{ textAlign: "center" }}>
      <Padding top="xl" bottom="xl">
        <img src={illustration} width={320} alt="" />
      </Padding>
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <Padding bottom="xs">
          <Text weight="semibold" color="dark">
            No active projects
          </Text>
        </Padding>
        <Padding bottom="xxl">
          <Text size="s">
            It looks like you haven't got any active projects. Once a client accepts
            an application, you will be able to manage the project from here.
          </Text>
        </Padding>
      </div>
    </Card>
  );
};
