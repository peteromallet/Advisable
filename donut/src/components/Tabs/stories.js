import React from "react";
import { storiesOf } from "@storybook/react";
import Tabs from ".";
import Padding from "../Padding";

storiesOf("Tabs", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto " }}>
        <Tabs>
          <Tabs.Tab title="One">One</Tabs.Tab>
          <Tabs.Tab title="Two">Two</Tabs.Tab>
          <Tabs.Tab title="Three">Three</Tabs.Tab>
        </Tabs>
      </div>
    );
  })
);
