// Renders the login page
import React from "react";
import { Switch, Route } from "react-router-dom";
import useScrollRestore from "../../utilities/useScrollRestore";
import LoginForm from "./LoginForm";
import Signup from "./Signup";

const Login = () => {
  useScrollRestore();

  return (
    <Switch>
      <Route path="/login/signup">
        <Signup />
      </Route>
      <Route>
        <LoginForm />
      </Route>
    </Switch>
  );
};

export default Login;
