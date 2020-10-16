import { Check, Search } from "@styled-icons/feather";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Circle, Box, Text, Button } from "@advisable/donut";

const Sent = () => {
  return (
    <Box maxWidth={500} mx="auto" textAlign="center">
      <Circle
        mb="m"
        bg="blue100"
        as={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        color="blue700"
      >
        <Check size={24} strokeWidth={2} />
      </Circle>
      <Text
        mb="xs"
        color="blue900"
        fontSize="xxl"
        fontWeight="bold"
        letterSpacing="-0.02em"
        as={motion.h1}
        transition={{ delay: 0.1 }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
      >
        Your consultation request has been sent
      </Text>
      <Text
        lineHeight="m"
        mb="l"
        as={motion.p}
        transition={{ delay: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 10 }}
      >
        You will be notified when a freelancer responds to your consultation
        request.
      </Text>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/freelancer_search">
          <Button prefix={<Search />} variant="secondary">
            Make another search
          </Button>
        </Link>
      </motion.div>
    </Box>
  );
};

export default Sent;
