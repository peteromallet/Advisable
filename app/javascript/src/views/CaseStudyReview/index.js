import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Box } from "@advisable/donut";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import Logo from "src/components/Logo";
import ReviewRatings from "./views/ReviewRatings";
import ReviewIntro from "./views/ReviewIntro";
import ReviewComment from "./views/ReviewComment";
import { useCaseStudy } from "./queries";
import ReviewComplete from "./views/ReviewComplete";

export default function CaseStudyReview() {
  const { data, loading, error } = useCaseStudy();
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;
  if (error) return <>Something went wrong, please refresh the page</>;

  return (
    <>
      <div className=" pt-10 pb-8 md:pt-12 md:pb-10 flex justify-center">
        <Logo />
      </div>
      <Container maxWidth="700px" pb="20px">
        <Routes>
          <Route path="/ratings" element={<ReviewRatings data={data} />} />
          <Route path="/comment" element={<ReviewComment data={data} />} />
          <Route path="/complete" element={<ReviewComplete data={data} />} />
          <Route path="/" element={<ReviewIntro data={data} />} />
        </Routes>
      </Container>
    </>
  );
}
