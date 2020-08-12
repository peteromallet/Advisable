import React from "react";
import { rgba } from "polished";
import { motion } from "framer-motion";
import { Container, Box, Text, Avatar } from "@advisable/donut";
import SpecialistRating from "../../../components/SpecialistRating";
import image01 from "./01.jpg";
import image02 from "./02.jpg";
import image03 from "./03.jpg";
import image04 from "./04.jpg";
import image05 from "./05.jpg";
import image06 from "./06.jpg";
import image07 from "./07.jpg";
import image08 from "./08.jpg";
import image09 from "./09.jpg";

function Specialist({ image, rating, name, location, opacity = 1, delay = 0 }) {
  return (
    <Box
      maxWidth={["120px", "160px"]}
      mx="auto"
      as={motion.div}
      textAlign="center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity, scale: 1 }}
      transition={{ delay }}
    >
      <Avatar
        bg="blue100"
        size={["m", "l"]}
        url={image}
        name={name}
        mx="auto"
        mb="20px"
      >
        {rating && (
          <SpecialistRating
            zIndex={1}
            bottom="-6px"
            position="absolute"
            left="calc(50% - 28px)"
          >
            {rating}
          </SpecialistRating>
        )}
      </Avatar>
      <Text
        fontSize={["13px", "16px"]}
        fontWeight="medium"
        mb="xxs"
        color="blue900"
      >
        {name}
      </Text>
      <Text
        color="neutral700"
        fontSize={["12px", "14px"]}
        lineHeight={["14px", "18px"]}
      >
        {location}
      </Text>
    </Box>
  );
}

const PLACEHOLDERS = [
  {
    id: "robert",
    image: image01,
    rating: 4.8,
    name: "Robert Wilson",
    location: "Cedar Hill, Vermont, United States",
  },
  {
    id: "debra",
    image: image02,
    rating: 4.6,
    name: "Debra Pena",
    location: "Hampshire, United Kingdom",
  },
  {
    id: "judith",
    image: image03,
    rating: 4.8,
    name: "Judith Williamson",
    location: "Fairfield, North Dakota, United States",
  },
  {
    id: "pat",
    image: image04,
    rating: 4.6,
    name: "Pat Mckinney",
    location: "Somerset, United Kingdom",
  },
  {
    id: "calvin",
    image: image05,
    rating: 4.8,
    name: "Calvin Edwards",
    location: "California, Riverside County, United States",
  },
  {
    id: "kathryn",
    image: image06,
    rating: 4.6,
    name: "Kathryn Henry",
    location: "California, United States",
  },
  {
    id: "dave",
    image: image07,
    rating: 4.6,
    name: "Dave Fisher",
    location: "Nevada, Lander, United States",
  },
  {
    id: "ann",
    image: image08,
    rating: 4.3,
    name: "Ann Richards",
    location: "Connecticut, United States",
  },
  {
    id: "Mitchell",
    image: image09,
    rating: 4.0,
    name: "Mitchell Lane",
    location: "Montana, United States",
  },
];

const MoreSpecialists = React.memo(function MoreSpecialists({
  children,
  specialists,
}) {
  let data = PLACEHOLDERS;

  // We only want to show a top row when we have at least 3 specialists.
  const hasThree = specialists.length >= 3;

  if (specialists.length > 0) {
    data.unshift(
      ...specialists.map((specialist) => ({
        id: specialist.id,
        image: specialist.avatar,
        rating: specialist.ratings?.overall,
        name: specialist.name,
        location: specialist.location,
      })),
    );
  }

  return (
    <Container maxWidth="720px" mx="auto">
      <Box position="relative">
        <Box
          display="grid"
          gridRowGap="40px"
          gridTemplateColumns={["1fr 1fr", "1fr 1fr 1fr"]}
        >
          {data.slice(0, 12).map((s, i) => (
            <Specialist
              key={s.id}
              name={s.name}
              image={s.image}
              rating={s.rating}
              location={s.location}
              opacity={s.opacity}
              delay={0.075 * i}
            />
          ))}
        </Box>
        <Box
          left={0}
          bottom={0}
          height={595}
          width="100%"
          backgroundImage={`linear-gradient(180deg, ${rgba(
            "#F5F5F8",
            0.6,
          )} 0%, #F5F5F8 100%)`}
          zIndex={1}
          position="absolute"
        />
        <Box
          position="absolute"
          zIndex={2}
          width="100%"
          top={hasThree ? "232px" : "40px"}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
});

export default MoreSpecialists;
