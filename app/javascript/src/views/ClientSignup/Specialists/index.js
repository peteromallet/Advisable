import React from "react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useLocation, Redirect } from "react-router-dom";
import { Box, Text, Button } from "@advisable/donut";
import { SlideInUp } from "../../../components/Animations";
import Logo from "../../../components/Logo";
import SearchingIndicator from "../../../components/SearchingIndicator";
import Heading from "./Heading";
import EmailModal from "./EmailModal";
import Specialist from "./Specialist";
import SideScroller from "./SideScroller";
import { Header, StyledSpecialist } from "./styles";

const Specailists = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const search = get(location, "state.search");
  const results = get(location, "state.results");
  const [selected, updateSelected] = React.useState([]);
  const [emailModal, setEmailModal] = React.useState(false);

  if (!results) {
    return <Redirect to="/clients/signup" />;
  }

  const toggleSelected = id => {
    if (selected.indexOf(id) > -1) {
      updateSelected(selected.filter(s => s !== id));
    } else {
      updateSelected([...selected, id]);
    }
  };

  const handleContinue = () => setEmailModal(true);

  return (
    <>
      <EmailModal isOpen={emailModal} onClose={() => setEmailModal(false)} />
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
          <SlideInUp key={specialist.id} duration="300ms" delay={`${i * 40}ms`}>
            <Specialist
              specialist={specialist}
              onSelect={toggleSelected}
              isSelected={selected.indexOf(specialist.id) > -1}
            />
          </SlideInUp>
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
