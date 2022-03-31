import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import Company from "./Company";
import Industry from "./Industry";
import Customers from "./Customers";
import Interests from "./Interests";
import "./onboarding.css";
import Logo from "src/components/Logo";
import { useOnboardingData } from "./queries";
import { Loading } from "src/components";

export default function UserOnboarding() {
  const { loading, data } = useOnboardingData();

  if (loading) return <Loading />;

  return (
    <div className="onboarding flex flex-col min-h-screen">
      <header className="onboarding_heading p-5">
        <Logo />
      </header>
      <div className="onboarding_content flex flex-1">
        <Routes>
          <Route path="/" exact element={<Welcome data={data} />} />
          <Route path="/company" element={<Company data={data} />} />
          <Route path="/industry" element={<Industry data={data} />} />
          <Route path="/customers" element={<Customers data={data} />} />
          <Route path="/interests" element={<Interests data={data} />} />
        </Routes>
      </div>
    </div>
  );
}
