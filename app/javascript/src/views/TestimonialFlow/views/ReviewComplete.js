import React from "react";
import { Button, Box, Text, Link } from "@advisable/donut";
import possessive from "src/utilities/possesive";
import { useLocation, Redirect } from "react-router-dom";
import Testimonial from "src/views/FreelancerProfileNew/components/Testimonial";

function Review({ review }) {
  return (
    <Box>
      <Testimonial review={review} />
    </Box>
  );
}

export default function ReviewComplete({ data }) {
  const { specialist, oauthViewer } = data;

  const location = useLocation();
  const review = location.state?.review;

  if (!oauthViewer) {
    return <Redirect to={`/review/${specialist.id}`} />;
  }

  return (
    <Box>
      <Text
        mb={3}
        color="blue900"
        fontWeight="medium"
        letterSpacing="-0.02em"
        fontSize={{ _: "24px", m: "30px" }}
        lineHeight={{ _: "28px", m: "32px" }}
      >
        Thanks! Your testimonial has been listed.
      </Text>
      <Text
        fontSize="16px"
        lineHeight="24px"
        color="neutral900"
        marginBottom={4}
      >
        You can see it in {possessive(specialist.firstName)} profile. Meanwhile,
        we have hundreds more world-class freelancers with experience that you
        might look for. Check them out!
      </Text>
      {review ? (
        <>
          <Box height="1px" bg="neutral200" width="100%" mb={4} />
          <Review review={review} />
          <Box height="1px" bg="neutral200" width="100%" mt={4} mb={5} />
        </>
      ) : null}
      <Button as={Link} to="/clients/join" size="l" ml="auto">
        Join Advisable
      </Button>
    </Box>
  );
}
