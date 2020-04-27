import React from "react";
import { ArrowLeft, Check, Plus } from "@styled-icons/feather";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory } from "react-router-dom";
import { Box, Text, Button, Link } from "@advisable/donut";
import SpecialistCard from "../../../components/SpecialistCard";
import useScrollRestore from "../../../utilities/useScrollRestore";
import Heading from "./Heading";
import BottomBar from "./BottomBar";

function SearchResults({ specialists }) {
  useScrollRestore();
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const selected = location.state?.selected || [];

  const selectedFreelancers = specialists.filter((s) => {
    return selected.indexOf(s.id) > -1;
  });

  const toggleSelected = (id) => {
    let nextSelected;
    if (selected.indexOf(id) > -1) {
      nextSelected = selected.filter((s) => s !== id);
    } else {
      nextSelected = [...selected, id];
    }

    history.replace({
      pathname: location.pathname,
      search: location.search,
      state: {
        ...location.state,
        selected: nextSelected,
      },
    });
  };

  const handleContinue = () => {
    history.push({
      pathname: "/clients/signup/save",
      search: location.search,
      state: location.state,
    });
  };

  return (
    <Box maxWidth={1100} mx="auto" py={{ _: "m", s: "xl" }} px="20px">
      <Link.External href="#" onClick={history.goBack} mb="xs">
        <Box display="inline-block" mr="xxs">
          <ArrowLeft size={16} strokeWidth={2} />
        </Box>
        Back
      </Link.External>
      <Text
        as="h2"
        mb="xs"
        color="blue.8"
        fontSize="xxxl"
        lineHeight="xxxl"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        {t("clientSignup.resultsHeading")}
      </Text>
      <Heading results={specialists} />

      <Box flexWrap="wrap" display="flex" ml="-10px" mr="-10px">
        {specialists.map((s, i) => (
          <Box
            key={s.id}
            as={motion.div}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: (i + 1) * 0.2 }}
            width={{ _: "100%", s: "50%", l: "33.3333%" }}
          >
            <SpecialistCard
              mx="10px"
              mb="20px"
              height={480}
              specialist={s}
              border="2px solid white"
              elevation={selected.indexOf(s.id) > -1 ? "l" : "m"}
              borderColor={selected.indexOf(s.id) > -1 && "blue.6"}
              action={
                <Button
                  aria-label={`Select ${s.name}`}
                  onClick={() => toggleSelected(s.id)}
                  variant={selected.indexOf(s.id) > -1 ? "primary" : "dark"}
                  prefix={selected.indexOf(s.id) > -1 ? <Check /> : <Plus />}
                >
                  {selected.indexOf(s.id) > -1 ? "Added" : "Add"}
                </Button>
              }
            />
          </Box>
        ))}
      </Box>

      <BottomBar
        specialists={selectedFreelancers}
        onContinue={handleContinue}
      />

      <Box height={1} width={200} bg="neutral.2" my="xl" mx="auto" />
      <Box maxWidth={500} mx="auto" textAlign="center" mb="xxl">
        <Text mb="xs" fontWeight="semibold">
          Don’t see anyone you like?
        </Text>
        <Text mb="m" lineHeight="m" fontSize="s">
          Don’t worry, we’ll handpick the perfect specialist for you.
        </Text>
        <Button
          variant="subtle"
          onClick={handleContinue}
          suffix={<ArrowRight />}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
}

export default SearchResults;
