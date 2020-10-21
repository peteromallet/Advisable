import React, { useEffect, useMemo, useReducer } from "react";
import { useHistory } from "react-router";
import { every } from "lodash-es";
import { rgba } from "polished";
// Utils
import createDispatcher from "src/utilities/createDispatcher";
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

const getProjectValues = (projects) =>
  projects.reduce(
    (acc, project) => {
      const skills = project.skills.map((skill) => skill.name);
      const industries = project.industries.map((industry) => industry.name);
      return {
        clientNames: { [project.clientName]: "https://test.com/" },
        industries: [...acc.industries, ...industries],
        skills: [...acc.skills, ...skills],
        reviews: [...acc.reviews, ...project.reviews],
      };
    },
    { clientNames: [], industries: [], skills: [], reviews: [] },
  );

const initFilterSection = (list) =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item]: {
        number: acc[item]?.number + 1 || 1,
        selected: false,
      },
    }),
    {},
  );

const init = (data) => {
  const projects = data.specialist.profileProjects;
  const {
    clientNames,
    industries: industriesList,
    skills: skillsList,
  } = getProjectValues(projects);
  const hasSkills = skillsList.length > 0;
  const skillsSection = hasSkills && initFilterSection(skillsList);
  const hasIndustries = industriesList.length > 0;
  const industriesSection = hasIndustries && initFilterSection(industriesList);

  const skillFilters = [];
  const industryFilters = [];
  return {
    id: data.specialist.id,
    isExpand: false,
    projects,
    hasSkills,
    skillsList,
    skillsSection,
    skillFilters,
    hasIndustries,
    industriesList,
    industriesSection,
    industryFilters,
    clientNames,
  };
};

const switchTagSelection = (state, section, tag) => {
  const sectionState = state[section];
  const tagState = sectionState[tag];
  const selected = !tagState.selected;

  const skillFilters =
    selected && section === "skillsSection"
      ? [...state.skillFilters, tag]
      : state.skillFilters.filter((filter) => filter !== tag);

  const industryFilters =
    selected && section === "industriesSection"
      ? [...state.industryFilters, tag]
      : state.industryFilters.filter((filter) => filter !== tag);

  return {
    ...state,
    skillFilters,
    industryFilters,
    [section]: {
      ...sectionState,
      [tag]: { ...tagState, selected },
    },
  };
};

const clearFilters = (state) => {
  const skillsSection = Object.keys(state.skillsSection).reduce(
    (acc, key) => ({ ...acc, [key]: { ...acc[key], selected: false } }),
    state.skillsSection,
  );
  const industriesSection = Object.keys(state.industriesSection).reduce(
    (acc, key) => ({ ...acc, [key]: { ...acc[key], selected: false } }),
    state.industriesSection,
  );
  return {
    ...state,
    skillFilters: [],
    industryFilters: [],
    skillsSection,
    industriesSection,
  };
};

const initFilters = (state, payload) => {
  const skillFilters = payload.skills ? [...payload.skills] : [];
  const industryFilters = payload.industries ? [...payload.industries] : [];
  const industriesSection =
    payload.industries?.reduce(
      (acc, key) => ({ ...acc, [key]: { ...acc[key], selected: true } }),
      state.industriesSection,
    ) || state.industriesSection;
  const skillsSection =
    payload.skills?.reduce(
      (acc, key) => ({ ...acc, [key]: { ...acc[key], selected: true } }),
      state.skillsSection,
    ) || state.skillsSection;

  return {
    ...state,
    skillFilters,
    industryFilters,
    industriesSection,
    skillsSection,
  };
};

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
    case "SET_NUM_OF_COLUMNS":
      return { ...state, numOfColumns: action.payload };
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
  const history = useHistory();

  // Update state actions
  const createAction = useMemo(() => createDispatcher(dispatch), []);
  const initFilters = createAction("INIT_FILTERS");
  const switchSkillSelection = createAction("SWITCH_SKILL_SELECTION");
  const switchIndustrySelection = createAction("SWITCH_INDUSTRY_SELECTION");
  const setNumOfColumns = useMemo(() => createAction("SET_NUM_OF_COLUMNS"), [
    createAction,
  ]);
  const clearFilters = createAction("CLEAR_FILTERS");

  useQueryStringFilter({
    industryFilters: state.industryFilters,
    skillFilters: state.skillFilters,
    initFilters,
  });

  // Responsivness
  const isWidescreen = useBreakpoint("mUp");
  const isTablet = useBreakpoint("m");
  const isMobile = useBreakpoint("s");

  // Update number of columns
  useEffect(() => {
    isWidescreen && setNumOfColumns(3);
    isTablet && setNumOfColumns(2);
    isMobile && setNumOfColumns(1);
  }, [isMobile, isTablet, isWidescreen, setNumOfColumns]);

  const projectCards = state.projects
    .filter(filterProjects(state))
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
              color={theme.colors.blue500}
              colorHover={theme.colors.blue500}
              colorActive={theme.colors.white}
              colorActiveHover={theme.colors.white}
              bg={rgba(theme.colors.blue100, 0.6)}
              bgHover={rgba(theme.colors.blue100, 0.9)}
              bgActive={theme.colors.neutral800}
              bgActiveHover={rgba(theme.colors.neutral800, 0.9)}
            />
          )}
          {state.hasIndustries && (
            <Tags
              key="industries-section"
              sectionName="industries"
              sectionTags={state.industriesSection}
              onClick={switchIndustrySelection}
              color={theme.colors.cyan800}
              colorHover={theme.colors.cyan800}
              colorActive={theme.colors.white}
              colorActiveHover={theme.colors.white}
              bg={rgba(theme.colors.cyan100, 0.6)}
              bgHover={rgba(theme.colors.cyan100, 0.9)}
              bgActive={theme.colors.neutral800}
              bgActiveHover={rgba(theme.colors.neutral800, 0.9)}
            />
          )}
        </Filter>
      )}
      <Box>
        <SectionHeaderWrapper>
          <SectionHeaderText>Previous Projects</SectionHeaderText>
          {isOwner && (
            <Button
              variant="minimal"
              ml="auto"
              onClick={() => history.push("/settings/references")}
            >
              Edit
            </Button>
          )}
        </SectionHeaderWrapper>
        {projectCards.length ? (
          <Masonry columns={state.numOfColumns}>{projectCards}</Masonry>
        ) : (
          <NoFilteredProjects firstName={data.specialist.firstName} />
        )}
      </Box>
    </Box>
  );
}

export default PreviousProjects;
