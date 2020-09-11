import React from "react";
import { Box } from "@advisable/donut";
import PreviousProjects from "./PreviousProjects";
import Testimonials from "./Testimonials";
import AboutSection from "./AboutSection";
import useViewer from "src/hooks/useViewer";

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
  const reviews = data.specialist.reviews;
  const {
    clientNames,
    industries: industriesList,
    skills: skillsList,
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
  console.log("data", data);
  const viewer = useViewer();
  const isOwner = viewer?.id === data.specialist.id;
  console.log("viewer", viewer);
  console.log("is owner", isOwner);

  return (
    <Box maxWidth="960px" mx="auto">
      <AboutSection
        specialist={data.specialist}
        isOwner={isOwner}
        viewer={viewer}
      />
      <PreviousProjects data={data} isOwner={isOwner} />
      <Testimonials reviews={data.specialist.reviews} />
    </Box>
  );
}

export default FreelancerProfileDesktop;
