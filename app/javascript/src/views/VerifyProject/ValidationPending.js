import React from "react";
import styled from "styled-components";
import { Container, Card, Box, Text, Avatar } from "@advisable/donut";
import ValidationActions from "./ValidationActions";
import AuthenticateWithLinkedin from "./AuthenticateWithLinkedin";
import renderLineBreaks from "../../utilities/renderLineBreaks";

const StyledTextMask = styled.div`
  left: 0;
  bottom: 0;
  height: 60px;
  width: 520px;
  position: absolute;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
`;

function ValidationPending({ data }) {
  const viewer = data.oauthViewer;
  const { title, excerpt, description, specialist } = data.previousProject;

  return (
    <Container maxWidth="700px">
      <Card padding="l">
        <Text
          mb="12px"
          color="blue900"
          fontSize="28px"
          lineHeight="32px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          {specialist.name} has requested you to verify a project on Advisable
        </Text>
        <Text fontSize="17px" lineHeight="24px" color="neutral700" mb="40px">
          When verified this project will be used to help {specialist.firstName}{" "}
          find other projects on Adivsable. Please review the details below and
          verify that they are correct.
        </Text>
        <Text
          fontSize="22px"
          lineHeight="26px"
          color="blue900"
          fontWeight="medium"
        >
          {title}
        </Text>
        <Box height={1} bg="blue100" mt="20px" mb="16px" />
        <Box display="flex" alignItems="center">
          <Avatar size="s" url={specialist.avatar} name={specialist.name} />
          <Box pl="12px">
            <Text fontSize="17px" color="blue900" fontWeight="medium" mb="2px">
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
        {viewer ? <ValidationActions /> : <AuthenticateWithLinkedin />}
      </Card>
    </Container>
  );
}

export default ValidationPending;
