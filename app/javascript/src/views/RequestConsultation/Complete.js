import React from "react";
import { Mail } from "@styled-icons/feather";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Card, Text, Link, Box } from "@advisable/donut";

const Complete = () => {
  const location = useLocation();
  const email = location.state.email;

  return (
    <Card>
      <Box textAlign="center" maxWidth={500} mx="auto" py="xxl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Box
            mb="m"
            width={60}
            height={60}
            bg="blue100"
            borderRadius="50%"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            color="blue500"
          >
            <Mail size={24} strokeWidth={1.5} />
          </Box>
        </motion.div>
        <Text
          mb="xs"
          as="h2"
          fontSize="xxl"
          fontWeight="semibold"
          color="blue800"
          letterSpacing="-0.025em"
        >
          Check your email to confirm your request
        </Text>
        <Text color="neutral700" lineHeight="s" mb="s">
          To confirm your request, please click on the link we sent to{" "}
          <Text as="span" fontWeight="medium">
            {email}
          </Text>
        </Text>
        <Text color="neutral700" lineHeight="s" mb="s" fontSize="s">
          If you can't find it in your inbox in the next 5 minutes, please check
          your spam folder as emails can occasionally get incorrectly flagged.
        </Text>
        <Text color="neutral700" lineHeight="s" fontSize="s">
          If you can't find it, email{" "}
          <Link.External href="mailto:hello@advisable.com">
            hello@advisable.com
          </Link.External>{" "}
          and we'll help ASAP.
        </Text>
      </Box>
    </Card>
  );
};

export default Complete;
