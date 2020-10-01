import React, { useReducer } from "react";
import { Box, Text } from "@advisable/donut";
import Masonry from "components/Masonry";
import createDispatcher from "src/utilities/createDispatcher";
import Tags from "./Filter/Tags";
import NoFilteredProjects from "./NoFilteredProjects";
import Filter from "./Filter";
import ProjectCard from "./ProjectCard";

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
    case "EXPAND_COLLAPSE":
      return { ...state, isExpand: !state.isExpand };
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
  const createAction = createDispatcher(dispatch);
  const switchSkillSelection = createAction("SWITCH_SKILL_SELECTION");
  const switchIndustrySelection = createAction("SWITCH_INDUSTRY_SELECTION");
  const expandCollapse = createAction("EXPAND_COLLAPSE");

  const projectCards = state.projects
    .filter(filterProjects(state))
    .map((project) => {
      return <ProjectCard key={project.id} project={project} />;
    });

  return (
    <Box>
      <Box
        position="relative"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        borderRadius="8px"
        mb="xl"
        p="8px 6px 12px 6px"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="neutral300"
      >
        <Filter>
          <Tags
            sectionName="Skills"
            sectionTags={state.skillsSection}
            onClick={switchSkillSelection}
            color="blue500"
            bgActive="blue100"
            maxHeight={state.isExpand ? null : "104px"}
          />
          <Tags
            sectionName="Industries"
            sectionTags={state.industriesSection}
            onClick={switchIndustrySelection}
            color="cyan800"
            bgActive="cyan100"
            maxHeight={state.isExpand ? null : "104px"}
          />
        </Filter>
        <Box
          position="absolute"
          bottom="-12px"
          bg="neutral50"
          display="inline-block"
          p="xxs"
          onClick={expandCollapse}
          css={`
            cursor: pointer;
          `}
        >
          <Text fontSize="xs" color="neutral600">
            {state.isExpand ? "Collapse" : "Expand"}
          </Text>
        </Box>
      </Box>
      {projectCards.length ? (
        <Masonry columns="3">{projectCards}</Masonry>
      ) : (
        <NoFilteredProjects firstName={data.specialist.firstName} />
      )}
    </Box>
  );
}

export default PreviousProjects;
