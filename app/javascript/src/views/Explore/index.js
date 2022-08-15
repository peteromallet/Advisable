import "./explore.css";
import React from "react";
import Footer from "src/components/Footer";
import TopicsBar from "./TopicsBar";
import { Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import useTutorial from "src/hooks/useTutorial";
import useViewer from "src/hooks/useViewer";
import Hero from "./Hero";

export default function Explore() {
  const viewer = useViewer();
  const onboarding = useTutorial("onboarding");

  if (!onboarding.isComplete) {
    return <Navigate replace to="/setup/company" />;
  }

  return (
    <>
      {!viewer && <Hero />}
      <ScrollToTop />
      <div className="max-w-[1300px] mx-auto px-5 lg:px-10 pb-10 min-h-[80vh]">
        <TopicsBar />
        <div className="h-px bg-neutral-200" />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
