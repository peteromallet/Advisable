import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Box, Text, Button, Link } from "@advisable/donut";
import AuthenticateWithLinkedin from "../components/AuthenticateWithLinkedin";
import MockTestimonials from "../components/Illustration";

export const StyledTextMask = styled.div`
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
  position: absolute;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
`;

function ReviewIntro({ data }) {
  const { specialist, oauthViewer } = data;

  if (oauthViewer) {
    return <Redirect to={`/review/${data.specialist?.id}/ratings`} />;
  }

  return (
    <>
      <MockTestimonials />
      <Box width={{ _: "100%", s: "80%" }} mx="auto" mt="-12px">
        <Text
          mb={2}
          color="blue900"
          textAlign="center"
          fontSize={{ _: "24px", m: "30px" }}
          lineHeight={{ _: "28px", m: "32px" }}
          fontWeight="semibold"
          letterSpacing="-0.02em"
        >
          Want to leave a testimonial for {specialist.name}?
        </Text>
        <Text
          fontSize="16px"
          textAlign="center"
          lineHeight="24px"
          color="neutral900"
          mb={6}
        >
          This will display your name, and profile photo publicly associated
          with their online profile and content on Advisable.
        </Text>
      </Box>
      {oauthViewer ? (
        <Button
          as={Link}
          to={{
            pathname: `/review/${specialist.id}/ratings`,
          }}
          size="l"
        >
          Leave a Review
        </Button>
      ) : (
        <AuthenticateWithLinkedin />
      )}
    </>
  );
}

export default ReviewIntro;
