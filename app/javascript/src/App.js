import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Root from './Root';
import ApplicationContainer from './components/ApplicationContainer';

const App = () => (
  <BrowserRouter>
    <ApplicationContainer>
      <Root />
    </ApplicationContainer>
  </BrowserRouter>
)

export default App
