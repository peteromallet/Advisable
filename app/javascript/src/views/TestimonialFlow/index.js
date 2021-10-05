import React from "react";
import { useReviewMeta } from "./queries";
import { useParams } from "react-router";
import { Box, Text } from "@advisable/donut";
import Loading from "src/components/Loading";
import Logo from "src/components/Logo";
import AuthenticateWithLinkedin from "./components/AuthenticateWithLinkedin";
import NotFound, { isNotFound } from "../NotFound";
import ReviewFlow from "./components/ReviewFlow";

export default function TestimonialFlow() {
  const params = useParams();
  const { id } = params;
  const { data, loading, error } = useReviewMeta(id);
  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <>
      <Box textAlign="center" py="40px">
        <Logo />
      </Box>
      {data.oauthViewer ? (
        <ReviewFlow specialist={data.specialist} />
      ) : (
        <Box>
          <Text>
            Want to leave a testimonial for {data.specialist?.name}?
            Authenticate with Linkedin below to validate your identity.
          </Text>
          <Text>
            This will display your name, and profile photo publicly associated
            with their online profile and content on Advisable.
          </Text>
          <AuthenticateWithLinkedin />
        </Box>
      )}
    </>
  );
}
