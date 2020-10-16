import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Pause } from "@styled-icons/ionicons-solid";
import { Box, Circle, Text, Paragraph, Button } from "@advisable/donut";
import { useToggleSourcing } from "./queries";

export default function RequestedIntroductions() {
  const { id } = useParams();
  const [toggleSourcing, { loading }] = useToggleSourcing();

  const handleToggle = async () => {
    await toggleSourcing({
      variables: {
        input: {
          project: id,
        },
      },
    });
  };

  return (
    <Box
      height="60vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        width="100%"
        maxWidth="460px"
        textAlign="center"
      >
        <Circle size="64px" marginBottom="xl" bg="neutral900" color="white">
          <Pause size="24px" />
        </Circle>
        <Text
          fontSize="4xl"
          color="neutral900"
          fontWeight="medium"
          marginBottom="xs"
          letterSpacing="-0.02em"
        >
          Recruitment paused
        </Text>
        <Paragraph marginBottom="xl">
          We are not currently looking for new candidates for this project. If
          you would like us to begin searching for freelancers again please
          click the button below.
        </Paragraph>
        <Button
          onClick={handleToggle}
          loading={loading}
          size="l"
          variant="subtle"
        >
          Enable Recruitment
        </Button>
      </Box>
    </Box>
  );
}
