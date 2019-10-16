import React from "react";
import { get } from "lodash";
import { Box, Text, Button } from "@advisable/donut";
import { SlideInUp } from "../../../components/Animations";
import SearchingIndicator from "../../../components/SearchingIndicator";
import { useLocation } from "react-router-dom";
import SideScroller from "./SideScroller";
import Specialist from "./Specialist";
import { StyledSpecialist } from "./styles";

const Specailists = () => {
  const location = useLocation();
  const specialists = get(location, "state.results");
  const [selected, updateSelected] = React.useState([]);

  const toggleSelected = id => {
    if (selected.indexOf(id) > -1) {
      updateSelected(selected.filter(s => s !== id));
    } else {
      updateSelected([...selected, id]);
    }
  };

  return (
    <>
      <Box maxWidth={700} ml="xxl">
        <Text
          as="h2"
          mb="xs"
          fontSize="xxl"
          lineHeight="xl"
          fontWeight="medium"
        >
          We have 285 Facebook Marketing specialists with experience working
          with Architecture startups
        </Text>
        <Text size="s" color="neutral.7" lineHeight="s">
          Here are {specialists.length} of the best. Select any specialists that
          you are interested in and we'll invite them to apply once your project
          is live.
        </Text>
      </Box>
      <SideScroller>
        {specialists.map((specialist, i) => (
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
              >
                Continue
              </Button>
            </Box>
          </StyledSpecialist>
        </SlideInUp>
      </SideScroller>
    </>
  );
};

export default Specailists;
