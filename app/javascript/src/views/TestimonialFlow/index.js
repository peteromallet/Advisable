import React, { Suspense } from "react";
import { useReviewMeta } from "./queries";
import { Route, useParams, Routes } from "react-router-dom";
import { Box, Container } from "@advisable/donut";
import NotFound, { isNotFound } from "src/views/NotFound";
import Loading from "src/components/Loading";
import Logo from "src/components/Logo";
// Review views
import ReviewComment from "./views/ReviewComment";
import ReviewRatings from "./views/ReviewRatings";
import ReviewComplete from "./views/ReviewComplete";
import ReviewIntro from "./views/ReviewIntro";

export default function TestimonialFlow() {
  const params = useParams();
  const { id } = params;
  const { data, loading, error } = useReviewMeta(id);
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <Suspense fallback={<Loading />}>
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      <Container maxWidth="700px" pb="20px">
        <Routes>
          <Route path="/ratings" element={<ReviewRatings data={data} />} />
          <Route path="/comment" element={<ReviewComment data={data} />} />
          <Route path="/complete" element={<ReviewComplete data={data} />} />
          <Route path="/" element={<ReviewIntro data={data} />} />
        </Routes>
      </Container>
    </Suspense>
  );
}
