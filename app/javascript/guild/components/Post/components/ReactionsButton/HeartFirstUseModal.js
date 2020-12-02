import React from "react";
import styled, { keyframes } from "styled-components";
import { Heart } from "@styled-icons/heroicons-solid";
import { Circle, Box, Modal, Text, Button, Paragraph } from "@advisable/donut";

const heartAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(0) scale(0.25);
  }

  to {
    opacity: 1;
    transform: translateY(-200px) scale(1);
  }
`;

const StyledAnimatedHeart = styled(Box)`
  top: 150px;
  z-index: 1;
  position: absolute;
  animation-name: ${heartAnimation};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function AnimatedHeart({ left }) {
  const duration = randomNumber(15, 25);
  const delay = randomNumber(0, duration);

  return (
    <StyledAnimatedHeart
      left={left}
      color="red200"
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `-${delay}s`,
      }}
    >
      <Box opacity={randomNumber(0.5, 1)}>
        <Heart size={24} />
      </Box>
    </StyledAnimatedHeart>
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
        <AnimatedHeart left="5%" y={90} />
        <AnimatedHeart left="10%" y={100} />
        <AnimatedHeart left="15%" y={130} />
        <AnimatedHeart left="20%" y={95} />
        <AnimatedHeart left="25%" y={115} />
        <AnimatedHeart left="30%" y={100} />
        <AnimatedHeart left="35%" y={140} />
        <AnimatedHeart left="40%" y={140} />
        <AnimatedHeart left="45%" y={80} />
        <AnimatedHeart left="50%" y={110} />
        <AnimatedHeart left="55%" y={125} />
        <AnimatedHeart left="60%" y={105} />
        <AnimatedHeart left="65%" y={110} />
        <AnimatedHeart left="70%" y={100} />
        <AnimatedHeart left="75%" y={90} />
        <AnimatedHeart left="80%" y={120} />
        <AnimatedHeart left="85%" y={105} />
        <AnimatedHeart left="90%" y={80} />

        <Circle
          bg="neutral100"
          color="red500"
          mb={8}
          zIndex={2}
          position="relative"
        >
          <Heart size={32} />
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
          happening. When you favourite a post, we will let the author know and
          give them the opportunity to connect with you. You won&apos;t see a
          count of how many other people have favourited the post.
        </Paragraph>
        <Button variant="dark" onClick={modal.hide}>
          Okay
        </Button>
      </Box>
    </Modal>
  );
}
