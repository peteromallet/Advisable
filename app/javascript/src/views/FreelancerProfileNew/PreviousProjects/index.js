import React, { useReducer } from "react";
import { Box, Card, Text } from "@advisable/donut";
import Masonry from "../Masonry";
import { curry } from "lodash-es";
import Tags from "./Tags";

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

const createDispatcher = curry((dispatch, type, payload) =>
  dispatch({ type, payload }),
);

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

function PreviousProjects({ data }) {
  const [state, dispatch] = useReducer(reducer, data, init);
  console.log("previous project state", state);
  const createAction = createDispatcher(dispatch);
  const switchSkillSelection = createAction("SWITCH_SKILL_SELECTION");
  const switchIndustrySelection = createAction("SWITCH_INDUSTRY_SELECTION");

  const projectCards = state.projects
    .filter(filterProjects(state))
    .map((project) => {
      return (
        <Card key={project.id} width="100%" p="m" borderRadius="12px">
          {project.coverPhoto && (
            <Box
              as="img"
              borderRadius="12px"
              src={project.coverPhoto.url}
              width="100%"
              height="178px"
              css="object-fit: cover;"
            />
          )}
          <Text fontSize="xl" fontWeight="medium">
            {project.title}
          </Text>
          <Text>{project.excerpt}</Text>
        </Card>
      );
    });

  return (
    <Box>
      <Box display="flex">
        <Box display="flex" flexWrap="wrap">
          <Tags
            variant="skills"
            section={state.skillsSection}
            switchTagSelection={switchSkillSelection}
          />
        </Box>
        <Box display="flex" flexWrap="wrap">
          <Tags
            variant="industries"
            section={state.industriesSection}
            switchTagSelection={switchIndustrySelection}
          />
        </Box>
      </Box>
      <Masonry columns="3">{projectCards}</Masonry>
    </Box>
  );
}

export default PreviousProjects;
