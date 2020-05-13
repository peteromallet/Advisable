import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Text, Avatar } from "@advisable/donut";
import SpecialistRating from "../../components/SpecialistRating";

function SimilarSpecialists({ specialists }) {
  if (specialists.length === 0) return null;

  return (
    <Container maxWidth="700px" mx="auto">
      <Box display="flex" justifyContent="space-between" mb="60px">
        {specialists.map((specialist, i) => (
          <Box
            as={motion.div}
            key={specialist.id}
            width="180px"
            textAlign="center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i }}
          >
            <Avatar
              size="l"
              url={specialist.avatar}
              name={specialist.name}
              mx="auto"
              mb="20px"
            >
              {specialist.ratings?.overall && (
                <SpecialistRating
                  bottom="-6px"
                  position="absolute"
                  left="calc(50% - 28px)"
                >
                  {specialist.ratings.overall}
                </SpecialistRating>
              )}
            </Avatar>
            <Text fontSize="l" fontWeight="medium" mb="xxs" color="blue900">
              {specialist.name}
            </Text>
            <Text lineHeight="18px" fontSize="14px" color="neutral700">
              {specialist.location}
            </Text>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default SimilarSpecialists;
