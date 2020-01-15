import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Box, Icon, Text, RoundedButton } from "@advisable/donut";
import pluralize from "../../../utilities/pluralize";

const SelectionBar = ({ specialists }) => {
  const location = useLocation();

  return (
    <Box
      left="0"
      bottom="-20px"
      height={100}
      width="100%"
      bg="white.9"
      position="fixed"
      boxShadow="0 10px 50px rgba(0, 0, 0, 0.2)"
      as={motion.div}
      animate={{
        y: specialists.length === 0 ? 80 : 0,
      }}
      initial={{
        y: specialists.length === 0 ? 80 : 0,
      }}
    >
      <Box maxWidth={1100} mx="auto" px="20px">
        <Box height={80} display="flex" alignItems="center">
          <Box width="100%">
            <Box ml="8px">
              {specialists.map(s => (
                <Box
                  key={s.id}
                  display="inline-block"
                  as={motion.div}
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                >
                  <Avatar
                    size={{ _: "s", s: "xs" }}
                    ml={{ _: "-16px", s: "-8px" }}
                    name={s.name}
                    url={s.avatar}
                    border="2px solid white"
                  />
                </Box>
              ))}
            </Box>
            <Box mt="xxs" display={{ _: "none", s: "block" }}>
              <Text fontSize="xs" color="neutral.7" letterSpacing="-0.01em">
                You have selected{" "}
                {pluralize(specialists.length, "freelancer", "freelancer's")}
              </Text>
            </Box>
          </Box>
          <RoundedButton
            as={Link}
            size="l"
            to={{
              ...location,
              pathname: "/freelancer_search/availability",
            }}
            suffix={<Icon icon="arrow-right" />}
          >
            Continue
          </RoundedButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectionBar;
