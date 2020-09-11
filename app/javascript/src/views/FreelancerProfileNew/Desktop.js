// Renders the desktop version of the freelancer profile
import React, { useState, useEffect, useReducer } from "react";
import Masonry from "./Masonry";
import { Box, useBreakpoint, Text, Card } from "@advisable/donut";
import useFilteredProjects from "./useFilteredProjects";
import RequestConsultationButton from "./RequestConsultationButton";

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

const setFilterParams = (list, filter) =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item]: {
        number: acc[item]?.number + 1 || 1,
        selected: filter.includes(item),
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
    reviews,
  } = getProjectValues(projects);
  const skillsFilter = [];
  const skillsParams = setFilterParams(skillsList, skillsFilter);
  const industriesFilter = [];
  const industriesParams = setFilterParams(industriesList, industriesFilter);
  const hasReviews = reviews.length > 0;
  return {
    id: data.specialist.id,
    projects,
    skillsList,
    skillsFilter,
    skillsParams,
    industriesList,
    industriesFilter,
    industriesParams,
    clientNames,
    testimonials: {},
    hasReviews,
    reviews,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SKILLS_STATE":
      return;
    case "UPDATE_INDUSTRIES_STATE":
      return;
    case "SWITCH_SKILL_FILTER":
      return;
    case "SWITCH_INDUSTRY_FILTER":
      return;
    default:
      return state;
  }
};

const createDispatcher = (dispatch) => (type) => (payload) =>
  dispatch({ type, payload });

function FreelancerProfileDesktop({ data }) {
  const [state, dispatch] = useReducer(reducer, data, init);
  console.log("state", state);
  const createAction = createDispatcher(dispatch);
  const updateIndustriesAction = createAction("UPDATE_INDUSTRIES_STATE");
  const updateSkillsAction = createAction("UPDATE_SKILLS_STATE");
  const switchIndustryFilter = createAction("SWITCH_INDUSTRY_FILTER");
  const switchSkillFilter = createAction("SWITCH_SKILL_FILTER");
  console.log("data", data);
  const projects = useFilteredProjects(data);

  const skillChips = Object.keys(state.skillsParams)
    .sort((a, b) => state.skillsParams[b].number - state.skillsParams[a].number)
    .map((param, index) => {
      return (
        <Box
          key={`${param}-${index}`}
          display="flex"
          p="s"
          borderRadius="8px"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="blue500"
          css={`
            user-select: none;
            cursor: pointer;
          `}
          m="6px"
        >
          <Text color="blue500" fontSize="xs">
            {param}
          </Text>
          <Text ml="s" color="blue500" fontSize="xs">
            {state.skillsParams[param].number}
          </Text>
        </Box>
      );
    });

  const industryChips = Object.keys(state.industriesParams)
    .sort(
      (a, b) =>
        state.industriesParams[b].number - state.industriesParams[a].number,
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
            {state.industriesParams[param].number}
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

  const reviews = state.reviews.map((review) => {
    return (
      <Card key={review.id} my="m" p="m">
        <Box display="flex">
          <Box width="320px">
            <Text>{review.name}</Text>
            <Text>{review.role}</Text>
          </Box>
          <Box width="628px">
            <Text>{review.comment}</Text>
          </Box>
        </Box>
      </Card>
    );
  });

  return (
    <Box maxWidth="1024px" mx="auto">
      <Box minHeight="514px" bg="#fff" mt="m" p="12px">
        <Box
          as="img"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/92b19080680791.5ce7e63751fcd.jpg"
          css="object-fit: cover;"
          width="100%"
          bg="red500"
          height="300px"
          mx="auto"
        />
        <Box display="flex">
          <Box
            as="img"
            src={data.specialist.avatar}
            width="148px"
            height="148px"
            borderRadius="50%"
            css="object-fit: cover;"
            mt="-32px"
            ml="l"
            mr="m"
          />
          <Box>
            <Text fontSize="xxxl" fontWeight="semibold" color="neutral900">
              {data.specialist.name}
            </Text>
            <Text>{data.specialist.location}</Text>
            <Text>{data.specialist.bio}</Text>
          </Box>
        </Box>
      </Box>
      <Box display="flex">
        <Box display="flex" flexWrap="wrap">
          {skillChips}
        </Box>
        <Box display="flex" flexWrap="wrap">
          {industryChips}
        </Box>
      </Box>
      <Masonry columns="3">{projectCards}</Masonry>
      <Box>
        <Text>Testimonials</Text>
        <Box>{reviews}</Box>
      </Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
