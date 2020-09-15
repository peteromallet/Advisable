import React, { useReducer } from "react";
import { Box, Card, Text } from "@advisable/donut";
import Masonry from "../Masonry";
import { curry } from "lodash-es";

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
  console.log("data", data);
  const projects = data.specialist.profileProjects;
  const {
    clientNames,
    industries: industriesList,
    skills: skillsList,
  } = getProjectValues(projects);
  const filterBySkills = false;
  const filterByIndusties = false;
  const skillsSection = initFilterSection(skillsList);
  const industriesSection = initFilterSection(industriesList);
  return {
    id: data.specialist.id,
    projects,
    skillsList,
    filterBySkills,
    skillsSection,
    industriesList,
    filterByIndusties,
    industriesSection,
    clientNames,
  };
};

const switchFilterTag = (state, section, tag) => {
  const sectionState = state[section];
  const tagState = sectionState[tag];
  const newValue = !tagState.selected;
  return {
    ...state,
    [section]: {
      ...sectionState,
      [tag]: { ...tagState, selected: newValue },
    },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SKILLS_STATE":
      return;
    case "UPDATE_INDUSTRIES_STATE":
      return;
    case "SWITCH_SKILL_FILTER":
      return switchFilterTag(state, "skillsSection", action.payload.skill);
    case "SWITCH_INDUSTRY_FILTER":
      return switchFilterTag(state, "skillsSection", action.payload.skill);
    default:
      return state;
  }
};

const createDispatcher = curry((dispatch, type, payload) =>
  dispatch({ type, payload }),
);

function PreviousProjects({ data }) {
  const [state, dispatch] = useReducer(reducer, data, init);
  console.log("previous project state", state);
  const createAction = createDispatcher(dispatch);
  const switchSkillFilter = createAction("SWITCH_SKILL_FILTER");

  const skillChips = Object.keys(state.skillsSection)
    .sort(
      (a, b) => state.skillsSection[b].number - state.skillsSection[a].number,
    )
    .map((skillKey, index) => {
      const { selected } = state.skillsSection[skillKey];
      return (
        <Box
          key={`${skillKey}-${index}`}
          display="flex"
          p="s"
          borderRadius="8px"
          borderWidth={1}
          bg={selected ? "blue100" : "none"}
          borderStyle="solid"
          borderColor="blue500"
          css={`
            user-select: none;
            cursor: pointer;
          `}
          m="6px"
          onClick={() => switchSkillFilter({ skill: skillKey })}
        >
          <Text color="blue500" fontSize="xs">
            {skillKey}
          </Text>
          <Text ml="s" color="blue500" fontSize="xs">
            {state.skillsSection[skillKey].number}
          </Text>
        </Box>
      );
    });

  const industryChips = Object.keys(state.industriesSection)
    .sort(
      (a, b) =>
        state.industriesSection[b].number - state.industriesSection[a].number,
    )
    .map((param, index) => {
      return (
        <Box
          key={`${param}-${index}`}
          display="flex"
          p="s"
          borderRadius="8px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="cyan700"
          m="6px"
          css={`
            user-select: none;
            cursor: pointer;
          `}
        >
          <Text color="cyan700" fontSize="xs">
            {param}
          </Text>
          <Text ml="s" color="cyan700" fontSize="xs">
            {state.industriesSection[param].number}
          </Text>
        </Box>
      );
    });

  const projectCards = state.projects.map((project) => (
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
  ));

  return (
    <Box>
      <Box display="flex">
        <Box display="flex" flexWrap="wrap">
          {skillChips}
        </Box>
        <Box display="flex" flexWrap="wrap">
          {industryChips}
        </Box>
      </Box>
      <Masonry columns="3">{projectCards}</Masonry>
    </Box>
  );
}

export default PreviousProjects;
