import React from "react";
import {
  Container,
  Button,
  Box,
  Text,
  Link,
  Heading,
  theme,
  useBackground,
} from "@advisable/donut";
import { Redirect } from "react-router-dom";
import LighthouseIllustration from "src/illustrations/zest/lighthouse";

export default function ReviewComplete({ data }) {
  useBackground("white");
  const { specialist, oauthViewer } = data;

  if (!oauthViewer) {
    return <Redirect to={`/review/${specialist.id}`} />;
  }

  return (
    <Container>
      <Box textAlign="center" maxWidth="520px" mx="auto">
        <Heading
          mb={3}
          fontSize={{ _: "24px", m: "30px" }}
          lineHeight={{ _: "28px", m: "32px" }}
          fontWeight={600}
          letterSpacing="-0.03em"
        >
          Thanks {oauthViewer.firstName}!
        </Heading>
        <Text
          fontSize="lg"
          lineHeight="24px"
          color="neutral900"
          marginBottom={12}
        >
          We have hundreds more world-class freelancers with experience working
          with companies like yours
        </Text>
      </Box>

      <Box maxWidth="460px" marginX="auto" marginBottom={8} textAlign="center">
        <LighthouseIllustration width="220px" color={theme.colors.blue400} />
        <Text
          marginTop={4}
          marginBottom={2}
          fontSize="20px"
          lineHeight="24px"
          fontWeight={550}
          letterSpacing="-0.03em"
        >
          Unlock acccess to world-class talent
        </Text>
        <Text fontSize="15px" lineHeight="m" mb={8} color="neutral700">
          Across 600+ different marketing skills, get instant recommendations of
          top talent with experience in different areas, backed by a no
          questions asked money-back guarantee.
        </Text>
        <Button as={Link} to="/clients/join" size="l" variant="gradient">
          Join Advisable
        </Button>
      </Box>
    </Container>
  );
}
