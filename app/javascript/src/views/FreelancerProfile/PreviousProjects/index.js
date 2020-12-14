import React, { useMemo, useReducer } from "react";
import { every } from "lodash-es";
import { rgba } from "polished";
// Utils
import createDispatcher from "src/utilities/createDispatcher";
import {
  init,
  initFilters,
  switchTagSelection,
  clearFilters,
} from "./reducerHandlers";
// Hooks
import useQueryStringFilter from "./useQueryStringFilter";
// Components
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";
import { Box, Button, useBreakpoint, theme } from "@advisable/donut";
import NoFilteredProjects from "./NoFilteredProjects";
import Masonry from "components/Masonry";
import ProjectCard from "./ProjectCard";
import Tags from "./Filter/Tags";
import Filter from "./Filter";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_FILTERS":
      return initFilters(state, action.payload);
    case "SWITCH_SKILL_SELECTION":
      return switchTagSelection(state, "skillsSection", action.payload.tag);
    case "SWITCH_INDUSTRY_SELECTION":
      return switchTagSelection(state, "industriesSection", action.payload.tag);
    case "CLEAR_FILTERS":
      return clearFilters(state);
    default:
      return state;
  }
};

const filterProjects = (state) => (project) => {
  const filterSkills = !!state.skillFilters.length;
  const filterIndustries = !!state.industryFilters.length;
  const allowedBySkills = filterSkills
    ? project.skills.some(
        ({ name: skill }) => state.skillFilters.indexOf(skill) > -1,
      )
    : true;
  const allowedByIndustries = filterIndustries
    ? project.industries.some(
        ({ name: industry }) => state.industryFilters.indexOf(industry) > -1,
      )
    : allowedBySkills;

  return every([allowedBySkills, allowedByIndustries]);
};

function PreviousProjects({ data, isOwner }) {
  const [state, dispatch] = useReducer(reducer, data, init);

  // Update state actions
  const createAction = useMemo(() => createDispatcher(dispatch), []);
  const initFilters = createAction("INIT_FILTERS");
  const switchSkillSelection = createAction("SWITCH_SKILL_SELECTION");
  const switchIndustrySelection = createAction("SWITCH_INDUSTRY_SELECTION");
  const clearFilters = createAction("CLEAR_FILTERS");

  useQueryStringFilter({
    industryFilters: state.industryFilters,
    skillFilters: state.skillFilters,
    initFilters,
  });

  // Responsivness
  const isTablet = useBreakpoint("m");
  const isMobile = useBreakpoint("s");
  const numOfColumns = useMemo(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  }, [isTablet, isMobile]);

  const projectCards = state.projects
    .filter((p) => p.validationStatus || isOwner)
    .filter(filterProjects(state))
    .filter((project) => !!project.excerpt)
    .map((project) => {
      return <ProjectCard key={project.id} project={project} />;
    });

  return (
    <Box mb="xxl">
      {(state.hasSkills || state.hasIndustries) && (
        <Filter
          skillFilters={state.skillFilters}
          industryFilters={state.industryFilters}
          clearFilters={clearFilters}
          firstName={data.specialist.firstName}
        >
          {state.hasSkills && (
            <Tags
              key="skills-section"
              sectionName="skills"
              sectionTags={state.skillsSection}
              onClick={switchSkillSelection}
              color={rgba("#234EE4", 0.85)}
              colorHover="#234EE4"
              colorActive={rgba("#1937A0", 0.85)}
              colorActiveHover={rgba("#1937A0", 0.85)}
              bg={theme.colors.neutral50}
              bgHover={theme.colors.blue50}
              bgActive="#CCD1F9"
              bgActiveHover={rgba("#CCD1F9", 0.9)}
              borderWidth="1px"
              borderColor="#AAB4F5"
              borderColorHover="#AAB4F5"
              borderColorActive="#CCD1F9"
              borderColorActiveHover={rgba("#CCD1F9", 0.9)}
            />
          )}
          {state.hasIndustries && (
            <Tags
              key="industries-section"
              sectionName="industries"
              sectionTags={state.industriesSection}
              onClick={switchIndustrySelection}
              color={rgba("#1B7A7D", 0.9)}
              colorHover="#1B7A7D"
              colorActive={rgba("#125153", 0.85)}
              colorActiveHover={rgba("#125153", 0.85)}
              bg={theme.colors.neutral50}
              bgHover={theme.colors.cyan50}
              bgActive="#C3E9EB"
              bgActiveHover={rgba("#C3E9EB", 0.9)}
              borderWidth="1px"
              borderColor="#9DCDCE"
              borderColorHover="#9DCDCE"
              borderColorActive="#C3E9EB"
              borderColorActiveHover={rgba("#C3E9EB", 0.9)}
            />
          )}
        </Filter>
      )}
      <Box>
        <SectionHeaderWrapper>
          <SectionHeaderText>Previous Projects</SectionHeaderText>
          {isOwner && (
            <Button
              as="a"
              size="xs"
              variant="subtle"
              ml="auto"
              href="/settings/references"
            >
              Edit projects
            </Button>
          )}
        </SectionHeaderWrapper>
        {projectCards.length ? (
          <Masonry columns={numOfColumns}>{projectCards}</Masonry>
        ) : (
          <NoFilteredProjects firstName={data.specialist.firstName} />
        )}
      </Box>
    </Box>
  );
}

export default PreviousProjects;
