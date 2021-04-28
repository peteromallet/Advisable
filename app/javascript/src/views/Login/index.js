// Renders the login page
import React from "react";
import { Switch } from "react-router-dom";
import Route from "src/components/Route";
import useScrollRestore from "../../utilities/useScrollRestore";
import { Box } from "@advisable/donut";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import Orbits from "./Orbits";

const Login = () => {
  useScrollRestore();

  return (
    <>
      <Orbits />
      <Box position="relative">
        <Switch>
          <Route path="/login/signup">
            <Signup />
          </Route>
          <Route>
            <LoginForm />
          </Route>
        </Switch>
      </Box>
    </>
  );
};

export default Login;
