// Renders the login page
import React from "react";
import useScrollRestore from "../../utilities/useScrollRestore";
import Orbits from "./Orbits";
import LoginView from "./LoginView";

const Login = () => {
  useScrollRestore();

  return (
    <>
      <Orbits />
      <div className="relative">
        <LoginView />
      </div>
    </>
  );
};

export default Login;
