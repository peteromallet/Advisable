import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Root from './Root';

const App = () => (
  <BrowserRouter>
    <Route component={Root} />
  </BrowserRouter>
)

export default App
