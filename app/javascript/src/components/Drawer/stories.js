import React from "react";
import { storiesOf } from "@storybook/react";
import Drawer from "./";
import Button from "../Button";
import Padding from "../Spacing/Padding";

storiesOf("Drawer", module).add("Basic", () =>
  React.createElement(() => {
    const [isOpen, setOpen] = React.useState(false);

    return (
      <Padding size="l">
        <Button onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setOpen(false)}
        >
          Drawer content
        </Drawer>
      </Padding>
    );
  })
);