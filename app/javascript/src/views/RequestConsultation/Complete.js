import React from "react";
import { Mail } from "@styled-icons/feather";
import { motion } from "framer-motion";
import { Card, Text, Circle, Box } from "@advisable/donut";

const Complete = ({ data }) => {
  const name = data?.specialist?.firstName;

  return (
    <Card borderRadius="12px">
      <Box textAlign="center" maxWidth={500} mx="auto" py={12}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Circle bg="cyan100" color="cyan800" mb={6}>
            <Mail size={24} strokeWidth={1.5} />
          </Circle>
        </motion.div>
        <Text
          mb={3}
          as="h2"
          fontSize="4xl"
          fontWeight="600"
          color="neutral900"
          letterSpacing="-0.04rem"
        >
          Consultation request sent
        </Text>
        <Text fontSize="l" lineHeight="1.3" color="neutral800">
          Thank&apos;s for submitting your consultation request. We have sent
          your request to {name} and we&apos;ll work to get a response from them
          ASAP.
        </Text>
      </Box>
    </Card>
  );
};

export default Complete;
