import React from "react";
import { get } from "lodash";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { Box, Text, Button } from "@advisable/donut";
import { SlideInUp } from "../../../components/Animations";
import Logo from "../../../components/Logo";
import SearchingIndicator from "../../../components/SearchingIndicator";
import { Header, StyledSpecialist } from "../styles";
import Heading from "./Heading";
import Specialist from "./Specialist";
import SideScroller from "./SideScroller";

const Specailists = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const search = get(location, "state.search");
  const results = get(location, "state.results");

  if (!results) {
    return <Redirect to="/clients/signup" />;
  }

  const selected = get(location, "state.selected") || [];

  const toggleSelected = id => {
    let nextSelected;
    if (selected.indexOf(id) > -1) {
      nextSelected = selected.filter(s => s !== id);
    } else {
      nextSelected = [...selected, id];
    }

    history.replace({
      pathname: location.pathname,
      state: {
        ...location.state,
        selected: nextSelected,
      },
    });
  };

  const handleContinue = () => {
    history.push({
      pathname: "/clients/signup/save",
      state: location.state,
    });
  };

  return (
    <>
      <Header>
        <Logo />
        <Button
          onClick={handleContinue}
          appearance="primary"
          intent="success"
          iconRight="arrow-right"
        >
          Continue
        </Button>
      </Header>
      <Box maxWidth={800} ml="xxl">
        <Text
          as="h2"
          mb="xs"
          fontSize="xxl"
          lineHeight="xl"
          fontWeight="semibold"
        >
          {t("clientSignup.resultsHeading")}
        </Text>
        <Heading search={search} results={results} />
      </Box>
      <SideScroller>
        {results.nodes.map((specialist, i) => (
          <motion.div
            key={specialist.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", delay: i * 0.15 }}
          >
            <Specialist
              specialist={specialist}
              onSelect={toggleSelected}
              isSelected={selected.indexOf(specialist.airtableId) > -1}
            />
          </motion.div>
        ))}
        <SlideInUp>
          <StyledSpecialist css="display: flex; align-items: center;">
            <Box textAlign="center" px="s">
              <Box mt="xl" mb="xl">
                <SearchingIndicator />
              </Box>
              <Text fontSize="s" mb="s">
                We'll identify the perfect specialist for you
              </Text>
              <Text fontSize="xxs" lineHeight="xs" color="neutral.6">
                Don’t worry, based on your exact requirements, our team will
                identify the perfect specialist for you from our network.
              </Text>
              <Button
                mt="l"
                intent="success"
                appearance="primary"
                iconRight="arrow-right"
                onClick={handleContinue}
              >
                Continue
              </Button>
            </Box>
          </StyledSpecialist>
        </SlideInUp>
      </SideScroller>
      <Box ml="xxl">
        <Text fontSize="s" fontWeight="medium" mb="xxs">
          Don't see anyone you like?
        </Text>
        <Text fontSize="xs" color="neutral.7" mb="s">
          Don’t worry, we’ll handpick the perfect specialist for you.
        </Text>
        <Button appearance="outlined" onClick={handleContinue} mb="l">
          Skip
        </Button>
      </Box>
    </>
  );
};

export default Specailists;
