import "./explore.css";
import React from "react";
import Footer from "src/components/Footer";
import TopicsBar from "./TopicsBar";
import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import useTutorial from "src/hooks/useTutorial";
import useViewer from "src/hooks/useViewer";
import Hero from "./Hero";
import SignupCTA from "src/components/SignupCTA";

export default function Explore() {
  const viewer = useViewer();
  const onboarding = useTutorial("onboarding");

  if (!onboarding.isComplete) {
    return <Navigate replace to="/setup/interests" />;
  }

  return (
    <>
      {!viewer && <Hero />}
      <ScrollToTop />
      <div className="px-5 pb-10 mx-auto lg:px-10 max-w-[1300px] min-h-[80vh]">
        <TopicsBar />
        <div className="h-px bg-neutral-200" />
        <Outlet />
        {!viewer && <SignupCTA />}
      </div>
      <Footer />
    </>
  );
}
