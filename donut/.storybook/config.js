import React from "react";
import Provider from "../src/components/Provider";
import { configure, addDecorator } from "@storybook/react";

addDecorator((storyFn) => {
  return <Provider>{storyFn()}</Provider>;
});

// automatically import all files ending in *.stories.js
configure(require.context("../src", true, /\.stories\.js$/), module);
configure(
  require.context("../../app/javascript/src", true, /\.stories\.js$/),
  module,
);
