import React from "react";
import { configure, addDecorator } from "@storybook/react";
import Provider from "../donut/src/components/Provider";

addDecorator(story => <Provider>{story()}</Provider>);

// automatically import all files ending in *.stories.js
const req = require.context("../donut/src", true, /stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
