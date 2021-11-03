import PropTypes from "prop-types";
import React from "react";
import { Box } from "@advisable/donut";
import useScrollToTop from "src/hooks/useScrollToTop";
import CoverImage from "../components/CoverImage";
import Sidebar from "../components/Sidebar";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import GeneralEmptyState from "../components/GeneralEmptyState";

function Profile({ isOwner, data }) {
  useScrollToTop();
  const { reviews, caseStudies } = data.specialist;

  return (
    <>
      <CoverImage
        isOwner={isOwner}
        src={data.specialist.coverPhoto}
        size={["xs", "s", "m", "l", "xl"]}
      />
      <Box
        display="flex"
        flexDirection={{ _: "column", l: "row" }}
        px={{ xs: 7, s: 9, l: 11, xl: 14 }}
        maxWidth={{ s: "700px", l: "none" }}
      >
        <Sidebar
          data={data}
          top={{ l: "196px", xl: "236px" }}
          isOwner={isOwner}
        />
        <Box width="100%" mt={{ _: 14, m: 12, l: 19, xl: 20 }}>
          <CaseStudies
            isOwner={isOwner}
            caseStudies={caseStudies}
            specialist={data.specialist}
          />
          <Testimonials
            isOwner={isOwner}
            reviews={reviews}
            specialist={data.specialist}
          />
          {reviews.length === 0 && caseStudies.length === 0 && !isOwner && (
            <GeneralEmptyState specialist={data.specialist} />
          )}
        </Box>
      </Box>
    </>
  );
}

Profile.propTypes = {
  isOwner: PropTypes.bool.isRequired,
};

export default Profile;
