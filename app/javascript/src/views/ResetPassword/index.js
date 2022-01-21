import React from "react";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import RequestPasswordReset from "./RequestPasswordReset";

function ResetPasswordContainer() {
  return (
    <Routes>
      <Route path="/:token" element={<ResetPassword />} />
      <Route path="/" element={<RequestPasswordReset />} />
    </Routes>
  );
}

export default ResetPasswordContainer;
