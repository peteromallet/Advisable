import React from "react";
import {
  Container,
  Card,
  Box,
  Text,
  Avatar,
  Button,
  Link,
} from "@advisable/donut";
import AuthenticateWithLinkedin from "./AuthenticateWithLinkedin";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import possessive from "src/utilities/possesive";
import { StyledTextMask } from "./styles";

function NoReview({ data }) {
  const viewer = data.oauthViewer;
  const { title, excerpt, description, specialist } = data.previousProject;

  return (
    <Container maxWidth="700px" pb="20px">
      <Card padding={{ _: "m", m: "l" }}>
        <Text
          mb="16px"
          color="blue900"
          fontSize={{ _: "24px", m: "30px" }}
          lineHeight={{ _: "28px", m: "32px" }}
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          {specialist.firstName} is asking you to leave a review on the project
          you previously verified
        </Text>
        <Text fontSize="16px" lineHeight="24px" color="neutral900" mb="40px">
          Your review will be listed in {possessive(specialist.firstName)}{" "}
          profile and used to help find other projects on Advisable. Also, it
          could promote you as a reliable client.
        </Text>
        <Text
          fontSize={{ _: "20px", m: "22px" }}
          color="blue900"
          lineHeight="26px"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          {title}
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
        <Box position="relative">
          <Text fontSize="16px" lineHeight="22px" color="neutral700" mb="32px">
            {viewer ? renderLineBreaks(description) : excerpt}
            {!viewer && <StyledTextMask />}
          </Text>
        </Box>
        {viewer ? (
          <Button
            as={Link}
            to={`/verify_project/${data.previousProject.id}/review/comment`}
            size="l"
          >
            Leave a Review
          </Button>
        ) : (
          <AuthenticateWithLinkedin data={data} />
        )}
      </Card>
    </Container>
  );
}

export default NoReview;
