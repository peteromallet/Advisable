import React from "react";
import { animated, useSpring } from "react-spring";
import { Box, Card, Text, Icon } from "@advisable/donut";

const OpenProject = ({ project }) => {
  const props = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(100px) scale(0.95)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
  });

  return (
    <Box position="absolute" bottom={20} left={20} right={20}>
      <animated.div style={props}>
        <Card padding="m" borderRadius={12} elevation="l">
          <Box display="flex" alignItems="center">
            <Box mr="xs">
              <Box
                width={40}
                height={40}
                bg="blue.0"
                display="flex"
                borderRadius="50%"
                alignItems="center"
                justifyContent="center"
              >
                <Icon icon="check-circle" color="blue.5" />
              </Box>
            </Box>
            <Box>
              <Text size="s" weight="medium" mb="xxs">
                Good news! We’ve have a project for you.
              </Text>
              <Text size="xs" color="neutral.6">
                Complete the application process to apply.
              </Text>
            </Box>
          </Box>
          <Box mt="s" padding="s" bg="neutral.0" borderRadius={8}>
            <Text size="s" weight="medium" mb="xxs" color="neutral.7">
              {project.primarySkill}
            </Text>
            <Text size="xs" color="neutral.6">
              {project.estimatedBudget}
            </Text>
          </Box>
        </Card>
      </animated.div>
    </Box>
  );
};

export default OpenProject;
