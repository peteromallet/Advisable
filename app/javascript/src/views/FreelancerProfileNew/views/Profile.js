import React from "react";
import { Box, Stack } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import CoverImage from "../components/CoverImage";
import Sidebar from "../components/Sidebar";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";

export default function Profile({ data }) {
  useScrollToTop();
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
          {caseStudies.length ? (
            <CaseStudies caseStudies={caseStudies} />
          ) : null}
          {reviews.length ? <Testimonials reviews={reviews} /> : null}
        </Stack>
      </Box>
    </>
  );
}
