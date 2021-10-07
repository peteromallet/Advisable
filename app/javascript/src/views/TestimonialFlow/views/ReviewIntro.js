import React from "react";
import queryString from "query-string";
import styled from "styled-components";
import { Redirect, useLocation } from "react-router-dom";
import { Card, Box, Text, Button, Link } from "@advisable/donut";
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
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const requested = queryParams.requested === "true";

  if (oauthViewer && !requested) {
    return <Redirect to={`/review/${data.specialist?.id}/ratings`} />;
  }

  return (
    <Card padding={["m", "l"]}>
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
          {requested
            ? `${specialist.firstName} has requested a testimonial from you`
            : `Want to leave a testimonial for ${specialist.name}?`}
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
        <Box display="flex" justifyContent="center">
          <Button
            as={Link}
            to={{
              pathname: `/review/${specialist.id}/ratings`,
            }}
            size="l"
          >
            Leave a Review
          </Button>
        </Box>
      ) : (
        <AuthenticateWithLinkedin data={data} />
      )}
    </Card>
  );
}

export default ReviewIntro;
