import React from "react";
import styled from "styled-components";
import { Box, Text, Avatar, Button, Link } from "@advisable/donut";
import AuthenticateWithLinkedin from "../components/AuthenticateWithLinkedin";
import possessive from "src/utilities/possesive";

export const StyledTextMask = styled.div`
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
  position: absolute;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
`;

function ReviewRequested({ data }) {
  const { specialist, oauthViewer } = data;

  return (
    <>
      <Text
        mb="16px"
        color="blue900"
        fontSize={{ _: "24px", m: "30px" }}
        lineHeight={{ _: "28px", m: "32px" }}
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        {specialist.firstName} has requested a review from you
      </Text>
      <Text fontSize="16px" lineHeight="24px" color="neutral900" mb="40px">
        Your review will be shown on {possessive(specialist.firstName)} profile
        and will be used to help them find clients on Advisable.
      </Text>
      <Box height={1} bg="blue100" mt="16px" mb="16px" />
      <Box display="flex" alignItems="center">
        <Avatar size="s" url={specialist.avatar} name={specialist.name} />
        <Box pl="12px">
          <Text fontSize="16px" color="blue900" fontWeight="medium" mb="2px">
            {specialist.name}
          </Text>
          <Text color="neutral600" fontSize="14px">
            {specialist.location}
          </Text>
        </Box>
      </Box>
      <Box height={1} bg="blue100" mt="16px" mb="20px" />
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
        <AuthenticateWithLinkedin data={data} />
      )}
    </>
  );
}

export default ReviewRequested;
