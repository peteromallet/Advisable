import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  Circle,
  Container,
  Button,
  Box,
  Text,
  Link,
} from "@advisable/donut";
import { Lock } from "@styled-icons/feather/Lock";
import { Redirect } from "react-router-dom";

export default function ReviewComplete({ data }) {
  const { specialist, oauthViewer } = data;

  if (!oauthViewer) {
    return <Redirect to={`/review/${specialist.id}`} />;
  }

  return (
    <Container>
      <Box textAlign="center" maxWidth="520px" mx="auto">
        <Text
          mb="12px"
          color="blue900"
          fontWeight="medium"
          letterSpacing="-0.02em"
          fontSize={{ _: "24px", m: "30px" }}
          lineHeight={{ _: "28px", m: "32px" }}
        >
          Thanks {oauthViewer.firstName}!
        </Text>
        <Text
          fontSize="16px"
          lineHeight="24px"
          color="neutral900"
          marginBottom="50px"
        >
          We have hundreds more world-class freelancers with experience working
          with companies like yours
        </Text>
      </Box>
      <Card
        mx="auto"
        elevation="l"
        as={motion.div}
        maxWidth="460px"
        padding={["m", "l"]}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.5 }}
      >
        <Box textAlign="center">
          <Circle bg="blue900" color="white" mb="20px">
            <Lock size={24} strokeWidth={2} />
          </Circle>
          <Text
            mb="xs"
            color="blue900"
            fontSize="20px"
            lineHeight="24px"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Unlock acccess to world-class talent
          </Text>
          <Text fontSize="15px" lineHeight="m" mb="l" color="neutral700">
            Across 600+ different marketing skills, get instant recommendations
            of top talent with experience in different areas, backed by a no
            questions asked money-back guarantee.
          </Text>
          <Button as={Link} to="/clients/join" size="l">
            Join Advisable
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
