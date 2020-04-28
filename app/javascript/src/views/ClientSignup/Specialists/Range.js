import React from "react";
import { rgba } from "polished";
import { minBy, maxBy } from "lodash-es";
import { motion } from "framer-motion";
import { ArrowRight } from "@styled-icons/feather";
import { Box, Circle, theme, Button, Text } from "@advisable/donut";
import { useHistory, useLocation } from "react-router-dom";
import currency from "../../../utilities/currency";
import { StyledPriceRange, StyledPriceRangeBackground } from "./styles";
import { withinLimits } from "./rangeHelpers";

const Range = ({ name, icon, specialists, animationDelay }) => {
  const history = useHistory();
  const location = useLocation();
  const cheapest = withinLimits(minBy(specialists, "hourlyRate").hourlyRate);
  const dearest = withinLimits(maxBy(specialists, "hourlyRate").hourlyRate);

  const handleClick = () => {
    history.push({
      pathname: "/clients/signup/specialists",
      search: location.search,
      state: {
        ...location.state,
        priceRange: {
          min: cheapest,
          max: dearest,
        },
      },
    });
  };

  return (
    <Box
      mb="m"
      width={{ _: "100%", m: 1 / 3 }}
      px="15px"
      as={motion.div}
      transition={{
        delay: animationDelay,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <StyledPriceRange as={motion.div} whileHover="hover">
        <Box zIndex={2}>
          <Circle
            mb="l"
            bg="blue.1"
            size={80}
            as={motion.div}
            color="blue700"
            variants={{
              hover: {
                scale: 1.1,
                backgroundColor: theme.colors.blue[2],
              },
            }}
          >
            {icon}
          </Circle>
          <Text
            mb="xs"
            fontSize="l"
            color="blue.9"
            fontWeight="medium"
            letterSpacing="-0.03em"
          >
            {name}
          </Text>
          <Text
            mb="xs"
            fontSize="xxl"
            color="blue.9"
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            {currency(cheapest, { format: "$0" })}
            {cheapest !== dearest && (
              <>
                {" - "}
                {currency(dearest, { format: "$0" })}
              </>
            )}
          </Text>
          <Text fontSize="xxs" color="neutral.7" mb="l">
            Per hour
          </Text>
          <Button
            onClick={handleClick}
            suffix={<ArrowRight />}
            variant="dark"
            aria-label={`Select ${name}`}
            size="l"
          >
            Continue
          </Button>
        </Box>
        <StyledPriceRangeBackground
          as={motion.div}
          initial={{
            boxShadow: `4px 0 16px ${rgba(theme.colors.blue[9], 0.06)}`,
          }}
          variants={{
            hover: {
              scale: 1.04,
              boxShadow: `16px 0 30px ${rgba(theme.colors.blue[9], 0.12)}`,
            },
          }}
        />
      </StyledPriceRange>
    </Box>
  );
};

export default Range;
