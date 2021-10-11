import React from "react";
import { useParams } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import { Box } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import CoverImage from "../components/CoverImage";
import Sidebar from "../components/Sidebar";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import GeneralEmptyState from "../components/GeneralEmptyState";

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
        <Box width="100%" mt={{ _: 14, m: 12, l: 19, xl: 20 }}>
          <CaseStudies caseStudies={caseStudies} specialist={data.specialist} />
          <Testimonials reviews={reviews} specialist={data.specialist} />
          {reviews.length === 0 && caseStudies.length === 0 && !isOwner && (
            <GeneralEmptyState specialist={data.specialist} />
          )}
        </Box>
      </Box>
    </>
  );
}
