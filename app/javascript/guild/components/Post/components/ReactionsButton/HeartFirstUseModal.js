import React from "react";
import { Bulb } from "@styled-icons/ionicons-outline";
import styled, { keyframes } from "styled-components";
import { Circle, Box, Modal, Text, Button, Paragraph } from "@advisable/donut";

const iconAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(0) scale(0.25);
  }

  to {
    opacity: 1;
    transform: translateY(-240px) scale(1);
  }
`;

const StyledAnimatedIcon = styled(Box)`
  top: 150px;
  z-index: 1;
  position: absolute;
  animation-name: ${iconAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function AnimatedIcon({ left }) {
  const duration = randomNumber(15, 25);
  const delay = randomNumber(0, duration);

  return (
    <StyledAnimatedIcon
      left={left}
      color="red200"
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `-${delay}s`,
      }}
    >
      <Circle bg="yellow100" opacity={randomNumber(0.5, 1)}>
        <Bulb size={24} />
      </Circle>
    </StyledAnimatedIcon>
  );
}

export default function HeartFirstUseModal({ modal }) {
  return (
    <Modal
      width={600}
      modal={modal}
      padding="0px"
      showCloseButton={false}
      label="Things are a little different around here"
    >
      <Box
        px={12}
        py={14}
        textAlign="center"
        position="relative"
        css={`
          overflow: hidden;
        `}
      >
        <AnimatedIcon left="10%" y={100} />
        <AnimatedIcon left="20%" y={95} />
        <AnimatedIcon left="30%" y={100} />
        <AnimatedIcon left="40%" y={140} />
        <AnimatedIcon left="50%" y={110} />
        <AnimatedIcon left="60%" y={105} />
        <AnimatedIcon left="70%" y={100} />
        <AnimatedIcon left="80%" y={120} />
        <AnimatedIcon left="90%" y={80} />

        <Circle
          bg="yellow100"
          color="yellow700"
          mb={8}
          zIndex={2}
          position="relative"
        >
          <Bulb size={32} />
        </Circle>
        <Text
          mb={3}
          fontSize="3xl"
          color="blue900"
          fontWeight="medium"
          letterSpacing="-0.02rem"
        >
          Things are a little different around here
        </Text>
        <Paragraph mb={8} color="neutral700">
          We don’t believe in vanity metrics. Our goal is to help you make
          authentic connections, and we think counters prevent that from
          happening. When you mark a post as interesting, we will let the author
          know and give them the opportunity to connect with you. You won&apos;t
          see a count of how many other people found it interesting.
        </Paragraph>
        <Button variant="dark" onClick={modal.hide}>
          Okay
        </Button>
      </Box>
    </Modal>
  );
}
