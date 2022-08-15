import "./explore.css";
import React from "react";
import Footer from "src/components/Footer";
import TopicsBar from "./TopicsBar";
import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import useTutorial from "src/hooks/useTutorial";

export default function Explore() {
  const onboarding = useTutorial("onboarding");

  if (!onboarding.isComplete) {
    return <Navigate replace to="/setup/company" />;
  }

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 lg:px-10 pb-10 min-h-[80vh]">
        <ScrollToTop />
        <TopicsBar />
        <div className="h-px bg-neutral-200" />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
