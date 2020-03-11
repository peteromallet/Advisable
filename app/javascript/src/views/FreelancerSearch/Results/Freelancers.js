import React from "react";
import { motion } from "framer-motion";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import { Box, Text, Icon, Link, RoundedButton } from "@advisable/donut";
import RequestCallButton from "../RequestCallButton";
import SpecialistCard from "../../../components/SpecialistCard";
import SelectionBar from "./SelectionBar";

const Freelancers = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const search = location.state?.search;
  const selectedFreelancers = location.state?.freelancers || [];

  const handleClickFreelancer = specialist => e => {
    let nextSelected;
    if (selectedFreelancers.indexOf(specialist.id) > -1) {
      nextSelected = selectedFreelancers.filter(s => s !== specialist.id);
    } else {
      nextSelected = [...selectedFreelancers, specialist.id];
    }

    history.replace({
      ...location,
      state: {
        ...location.state,
        freelancers: nextSelected,
      },
    });
  };

  return (
    <Box>
      <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        <Link mb="xs" to="/freelancer_search">
          <Icon icon="arrow-left" width={16} height={16} mr="xxs" /> Back
        </Link>
        <Text
          as="h2"
          mb="xs"
          color="blue.8"
          fontSize="26px"
          lineHeight="24px"
          fontWeight="semibold"
          letterSpacing="-0.035em"
        >
          We found {data.specialists.nodes.length} {search.skill} freelancers
        </Text>
        <Text
          mb="l"
          fontSize="l"
          lineHeight="s"
          color="neutral.8"
          letterSpacing="-0.01em"
        >
          Please select the freelancers you would like to request a consultation
          with.
        </Text>
      </motion.div>
      <Box flexWrap="wrap" display="flex" ml="-10px" mr="-10px">
        {data.specialists.nodes.map((s, i) => (
          <Box
            as={motion.div}
            key={s.id}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            width={{ _: "100%", s: "50%", l: "33.3333%" }}
            transition={{ delay: (i + 1) * 0.2 }}
          >
            <SpecialistCard
              mx="10px"
              mb="20px"
              height={480}
              specialist={s}
              elevation={selectedFreelancers.indexOf(s.id) > -1 ? "l" : "m"}
              border="2px solid white"
              borderColor={selectedFreelancers.indexOf(s.id) > -1 && "blue.6"}
              action={
                <RoundedButton
                  aria-label={`Select ${s.name}`}
                  onClick={handleClickFreelancer(s)}
                  variant={
                    selectedFreelancers.indexOf(s.id) > -1 ? "primary" : "dark"
                  }
                  prefix={
                    <Icon
                      icon={
                        selectedFreelancers.indexOf(s.id) > -1
                          ? "check"
                          : "plus"
                      }
                    />
                  }
                >
                  {selectedFreelancers.indexOf(s.id) > -1 ? "Added" : "Add"}
                </RoundedButton>
              }
            />
          </Box>
        ))}
      </Box>
      <Box height={1} width={200} bg="neutral.2" my="xl" mx="auto" />
      <Box maxWidth={500} mx="auto" textAlign="center" mb="xxl">
        <Text mb="xs" fontWeight="semibold">
          Don’t see anyone you like?
        </Text>
        <Text mb="m" lineHeight="m" fontSize="s">
          Make another search or request a call with an Advisable project
          manager and we’ll identify the perfect person for you.
        </Text>
        <RoundedButton
          mr="s"
          as={RouterLink}
          variant="secondary"
          to="/freelancer_search"
          prefix={<Icon icon="search" />}
        >
          Make another search
        </RoundedButton>
        <RequestCallButton>Request a call</RequestCallButton>
      </Box>
      <SelectionBar
        specialists={data.specialists.nodes.filter(
          s => selectedFreelancers.indexOf(s.id) > -1
        )}
      />
    </Box>
  );
};

export default Freelancers;
