import React, { useReducer } from "react";
import { Box, Text, Button, useBreakpoint, theme } from "@advisable/donut";
import Masonry from "components/Masonry";
import createDispatcher from "src/utilities/createDispatcher";
import Tags from "./Filter/Tags";
import NoFilteredProjects from "./NoFilteredProjects";
import Filter from "./Filter";
import ProjectCard from "./ProjectCard";
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";
import { mockedIndustries, mockedSkills } from "./mockedFilterData";
import { useHistory } from "react-router";
import { rgba } from "polished";

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
  const skillsSection = initFilterSection(skillsList);
  const industriesSection = initFilterSection(industriesList);
  const skillFilters = [];
  const industryFilters = [];
  return {
    id: data.specialist.id,
    isExpand: false,
    projects,
    skillsList,
    skillsSection,
    skillFilters,
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

const reducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_SKILL_SELECTION":
      return switchTagSelection(state, "skillsSection", action.payload.tag);
    case "SWITCH_INDUSTRY_SELECTION":
      return switchTagSelection(state, "industriesSection", action.payload.tag);
    default:
      return state;
  }
};

const filterProjects = (state) => (project) => {
  const filterSkills = !!state.skillFilters.length;
  const filterIndustries = !!state.industryFilters.length;
  const allowedBySkills = filterSkills
    ? project.skills.some(({ name: skill }) =>
        state.skillFilters.includes(skill),
      )
    : true;
  const allowedByIndustries = filterIndustries
    ? project.industries.some(({ name: industry }) =>
        state.industryFilters.includes(industry),
      )
    : true;
  return allowedBySkills && allowedByIndustries;
};

function PreviousProjects({ data, isOwner }) {
  const [state, dispatch] = useReducer(reducer, data, init);
  const history = useHistory();
  const createAction = createDispatcher(dispatch);
  const switchSkillSelection = createAction("SWITCH_SKILL_SELECTION");
  const switchIndustrySelection = createAction("SWITCH_INDUSTRY_SELECTION");

  // Responsivness
  const isWidescreen = useBreakpoint("mUp");
  const isTablet = useBreakpoint("m");
  const isMobile = useBreakpoint("s");
  const numOfColumns =
    (isMobile && 1) || (isTablet && 2) || (isWidescreen && 3);

  const projectCards = state.projects
    .filter(filterProjects(state))
    .map((project) => {
      return <ProjectCard key={project.id} project={project} />;
    });

  return (
    <Box mb="xxl">
      <Filter>
        <Tags
          sectionName="skills"
          sectionTags={state.skillsSection}
          onClick={switchSkillSelection}
          color={theme.colors.blue500}
          colorHover={theme.colors.blue500}
          colorActive={theme.colors.white}
          colorActiveHover={theme.colors.white}
          bg={rgba(theme.colors.blue100, 0.6)}
          // bg={theme.colors.blue50}
          bgHover={rgba(theme.colors.blue100, 0.9)}
          bgActive={theme.colors.neutral800}
          bgActiveHover={rgba(theme.colors.neutral800, 0.9)}
        />
        <Tags
          sectionName="industries"
          sectionTags={state.industriesSection}
          onClick={switchIndustrySelection}
          color={theme.colors.cyan800}
          colorHover={theme.colors.cyan800}
          colorActive={theme.colors.white}
          colorActiveHover={theme.colors.white}
          // bg={theme.colors.cyan50}
          bg={rgba(theme.colors.cyan100, 0.6)}
          bgHover={rgba(theme.colors.cyan100, 0.9)}
          bgActive={theme.colors.neutral800}
          bgActiveHover={rgba(theme.colors.neutral800, 0.9)}
        />
      </Filter>
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
          <Masonry columns={numOfColumns}>{projectCards}</Masonry>
        ) : (
          <NoFilteredProjects firstName={data.specialist.firstName} />
        )}
      </Box>
    </Box>
  );
}

export default PreviousProjects;
