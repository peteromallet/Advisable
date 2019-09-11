import React from "react";
import { storiesOf } from "@storybook/react";
import Menu from ".";
import Text from "../Text";
import Button from "../Button";

storiesOf("Menu", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto" }}>
        <Menu
          aria-label="Task actions"
          trigger={<Button type="button" icon="more-horizontal" />}
          items={[
            <Menu.Item title="Delete" />,
            <Menu.Item title="Mark as trial task" />,
            <Menu.Item
              title="Mark as repeating"
              description="You will have the opportunity to repeat this task every month."
            />,
          ]}
        />
      </div>
    );
  })
);
