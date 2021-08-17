import React, { useLayoutEffect } from "react";
import { Box, useTheme } from "@advisable/donut";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import CoverImage from "./components/CoverImage";
import Sidebar from "./components/Sidebar";
import { useProfileData } from "./queries";
import CaseStudies from "./components/CaseStudies";
import Testimonials from "./components/Testimonials";

export default function FreelancerProfileNew() {
  const { loading, data, error } = useProfileData();
  const theme = useTheme();

  // Set background color to white
  useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" pb={10}>
      <CoverImage
        src={data.specialist.coverPhoto}
        size={["xs", "s", "m", "l", "xl"]}
      />
      <Box display="flex" flexDirection={{ _: "column", l: "row", xl: "row" }}>
        <Sidebar data={data} />
        <Box>
          <CaseStudies />
          <Testimonials />
        </Box>
      </Box>
    </Box>
  );
}
