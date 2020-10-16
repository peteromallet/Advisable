import { motion } from "framer-motion";
import { CheckCircle } from "@styled-icons/feather";
import { Box, Card, Text } from "@advisable/donut";

const OpenProject = ({ project }) => {
  return (
    <Box position="absolute" bottom={30} left={30} right={30}>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <Card padding="m" borderRadius={12} elevation="l">
          <Box display="flex" alignItems="center">
            <Box mr="xs">
              <Box
                width={40}
                height={40}
                bg="blue50"
                display="flex"
                borderRadius="50%"
                alignItems="center"
                justifyContent="center"
                color="blue500"
              >
                <CheckCircle size={24} strokeWidth={2} />
              </Box>
            </Box>
            <Box>
              <Text size="s" weight="medium" mb="xxs">
                Good news! We’ve have a project for you.
              </Text>
              <Text size="xs" color="neutral600">
                Complete the application process to apply.
              </Text>
            </Box>
          </Box>
          <Box mt="s" padding="s" bg="neutral50" borderRadius={8}>
            <Text size="s" weight="medium" mb="xxs" color="neutral700">
              {project.primarySkill?.name}
            </Text>
            <Text size="xs" color="neutral600">
              {project.estimatedBudget}
            </Text>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default OpenProject;
