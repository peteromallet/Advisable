import React from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router";
import { Box, useBackground } from "@advisable/donut";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import Article from "./views/Article";
import Profile from "./views/Profile";
import { useProfileData } from "./queries";
import ErrorBoundary from "src/components/ErrorBoundary";
import useViewer from "src/hooks/useViewer";

export default function FreelancerProfile() {
  const viewer = useViewer();
  const { loading, data, error } = useProfileData();
  useBackground("white");

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const isOwner = viewer?.id === data.specialist.id;

  return (
    <ErrorBoundary>
      {data?.specialist && (
        <Helmet>
          <title>Advisable | {data?.specialist?.name}</title>
        </Helmet>
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems={{ _: "center", l: "stretch" }}
        width={{ l: "1024px", xl: "1136px" }}
        mx="auto"
        pb={20}
        pt={[3, 5, 5, 5, 7]}
      >
        <Routes>
          <Route
            path="/:slug"
            element={<Article isOwner={isOwner} profileData={data} />}
          />
          <Route path="*" element={<Profile isOwner={isOwner} data={data} />} />
        </Routes>
      </Box>
    </ErrorBoundary>
  );
}
