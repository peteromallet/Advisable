import React from "react";
import { storiesOf } from "@storybook/react";
import Tabs from ".";

storiesOf("Tabs", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto " }}>
        <Tabs>
          <Tabs.Tab icon="list" title="Active Tasks">
            This is the active tasks section
          </Tabs.Tab>
          <Tabs.Tab icon="check-square" title="Completed Tasks">
            This is the completed tasks section
          </Tabs.Tab>
        </Tabs>
      </div>
    );
  })
);
