import { Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loading from "src/components/Loading";
import RequireAuthentication from "./components/RequireAuthentication";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ApplicationRoutes from "./ApplicationRoutes";
import UserOnboarding from "./views/UserOnboarding";
const CaseStudyReview = lazy(() => import("./views/CaseStudyReview"));
const ResetPassword = lazy(() => import("./views/ResetPassword"));
const ConfirmAccount = lazy(() => import("./views/ConfirmAccount"));
const TestimonialFlow = lazy(() => import("./views/TestimonialFlow"));
const Availability = lazy(() => import("./views/Availability"));
const Join = lazy(() => import("./views/Join"));
const VideoCall = lazy(() => import("./views/VideoCall"));

const MainRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route path="/reset_password/*" element={<ResetPassword />} />
        <Route path="/confirm_account/:token" element={<ConfirmAccount />} />
        <Route path="/signup/:id" element={<Signup />} />
        <Route
          path="/clients/:userID/availability"
          exact
          element={
            <RequireAuthentication clientOnly>
              <Availability />
            </RequireAuthentication>
          }
        />
        <Route
          path="/calls/:id"
          element={
            <RequireAuthentication>
              <VideoCall />
            </RequireAuthentication>
          }
        />
        <Route path="/join/*" element={<Join />} />
        <Route
          path="/review/:id/case_studies/:article_id/*"
          element={<CaseStudyReview />}
        />
        <Route path="/review/:id/*" element={<TestimonialFlow />} />
        <Route
          path="/setup/*"
          element={
            <RequireAuthentication>
              <UserOnboarding />
            </RequireAuthentication>
          }
        />
        <Route path="*" element={<ApplicationRoutes />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
