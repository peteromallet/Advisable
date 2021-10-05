import React from "react";
import { Box, Text, Heading } from "@advisable/donut";
import BackButton from "src/components/BackButton";
import { useSkillCategories } from "../queries";
import { Link } from "react-router-dom";

export default function ShortlistSkillCategory() {
  const { data } = useSkillCategories();

  const categories = data?.skillCategories || [];

  return (
    <>
      <BackButton to="/explore" marginBottom={4} />
      <Heading
        fontSize="6xl"
        letterSpacing="-0.04em"
        marginBottom={3}
        lineHeight="40px"
      >
        What are you looking for?
      </Heading>
      <Box maxWidth="600px" marginBottom={8}>
        <Text fontSize="lg" lineHeight="24px">
          We have freelancers working in all kinds of fields. Let us know which
          one you are interested in.
        </Text>
      </Box>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="20px">
        {categories.map((c) => (
          <Link to={`/explore/new/${c.slug}`} key={c.slug}>
            <Box padding={5} borderRadius="12px" bg="neutral100">
              <Text
                fontSize="xl"
                fontWeight={550}
                letterSpacing="-0.02em"
                marginBottom={2}
                color="neutral900"
              >
                {c.name}
              </Text>
              <Text
                fontSize="sm"
                letterSpacing="-0.01em"
                lineHeight="20px"
                color="neutral800"
              >
                A brief description of what is inside the skill category
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </>
  );
}
