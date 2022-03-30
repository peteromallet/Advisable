import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import Company from "./Company";
import Industry from "./Industry";
import Customers from "./Customers";
import Interests from "./Interests";
import "./onboarding.css";
import Logo from "src/components/Logo";

export default function UserOnboarding() {
  return (
    <div className="onboarding flex flex-col min-h-screen">
      <header className="onboarding_heading p-5">
        <Logo />
      </header>
      <div className="onboarding_content flex flex-1">
        <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/company" element={<Company />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/interests" element={<Interests />} />
        </Routes>
      </div>
    </div>
  );
}
