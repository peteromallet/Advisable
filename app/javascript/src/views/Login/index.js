// Renders the login page
import React from "react";
import { Routes, Route } from "react-router-dom";
import useScrollRestore from "../../utilities/useScrollRestore";
import { Box } from "@advisable/donut";
import Signup from "./Signup";
import Orbits from "./Orbits";
import LoginView from "./LoginView";

const Login = () => {
  useScrollRestore();

  return (
    <>
      <Orbits />
      <Box position="relative">
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<LoginView />} />
        </Routes>
      </Box>
    </>
  );
};

export default Login;
