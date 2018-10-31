import { configure } from '@storybook/react';
import "../app/javascript/src/reset.css.js"

const req = require.context('../app/javascript/src', true, /.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
