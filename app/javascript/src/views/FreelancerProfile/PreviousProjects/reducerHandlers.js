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

export const init = (data) => {
  const projects = data.specialist.previousProjects.nodes;
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

export const initFilters = (state, payload) => {
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

export const switchTagSelection = (state, section, tag) => {
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

export const clearFilters = (state) => {
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
