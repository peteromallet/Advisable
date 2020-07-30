import { addDecorator } from "@storybook/react";
import React from "react";
import Provider from "../src/components/Provider";

addDecorator((storyFn) => {
  return <Provider>{storyFn()}</Provider>;
});
