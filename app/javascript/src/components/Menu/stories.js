import React from "react";
import { storiesOf } from "@storybook/react";
import Menu from "./";
import Card from "../Card";
import Padding from "../Spacing/Padding";

storiesOf("Menu", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <Padding size="xxl">
        <Card>
          <Padding size="xxl" style={{ textAlign: "right" }}>
            <Menu>
              <Menu.Item icon="edit">
                Edit
              </Menu.Item>
              <Menu.Item icon="trash">
                Delete...
              </Menu.Item>
            </Menu>
          </Padding>
        </Card>
      </Padding>
    );
  })
);
