import React from "react";
import { configure, addDecorator } from '@storybook/react';
import BaseStyling from '../app/javascript/src/BaseStyling';

function withStyles(storyFn) {
  return (
    <React.Fragment>
      <BaseStyling />
      {storyFn()}
    </React.Fragment>
  )
}

addDecorator(withStyles);

// automatically import all files ending in *stories.js
const req = require.context('../app/javascript', true, /stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
