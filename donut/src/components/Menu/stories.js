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
        >
          <Menu.Item title="First" onClick={() => alert("First")} />
          <Menu.Item title="Second" onClick={() => alert("Second")} />
        </Menu>
      </div>
    );
  })
);
