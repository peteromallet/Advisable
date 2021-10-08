import React from "react";
import { useParams } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import { Box, Stack } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import CoverImage from "../components/CoverImage";
import Sidebar from "../components/Sidebar";
import CaseStudies from "../components/CaseStudies";
import CaseStudiesEmptyState from "../components/CaseStudiesEmptyState";
import Testimonials from "../components/Testimonials";
import TestimonialsEmptyState from "../components/TestimonialsEmptyState";

export default function Profile({ data }) {
  useScrollToTop();
  const { id } = useParams();
  const viewer = useViewer();
  const isOwner = viewer?.id === id;
  const { reviews, caseStudies } = data.specialist;
  return (
    <>
      <CoverImage
        src={data.specialist.coverPhoto}
        size={["xs", "s", "m", "l", "xl"]}
      />
      <Box
        display="flex"
        flexDirection={{ _: "column", l: "row" }}
        px={{ xs: 7, s: 9, l: 11, xl: 14 }}
        maxWidth={{ s: "700px", l: "none" }}
      >
        <Sidebar data={data} top="88px" />
        <Stack mt={{ _: 14, m: 12, l: 19, xl: 20 }} width="100%" spacing={11}>
          {caseStudies.length > 0 && (
            <CaseStudies
              caseStudies={caseStudies}
              specialist={data.specialist}
            />
          )}
          {caseStudies.length === 0 && isOwner && (
            <CaseStudiesEmptyState specialist={data.specialist} />
          )}
          {reviews.length > 0 && (
            <Testimonials reviews={reviews} specialist={data.specialist} />
          )}
          {caseStudies.length === 0 && isOwner && <TestimonialsEmptyState />}
        </Stack>
      </Box>
    </>
  );
}
