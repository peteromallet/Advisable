import React, { useMemo, useReducer } from "react";
import every from "lodash/every";
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
import {
  SectionHeaderText,
  SectionHeaderWrapper,
} from "../components/SectionHeader";
import { Box, useBreakpoint } from "@advisable/donut";
import AddPreviousProjectButton from "src/components/AddPreviousProjectButton";
import NoFilteredProjects from "./NoFilteredProjects";
import Masonry from "src/components/Masonry";
import ProjectCard from "src/components/ProjectCard";
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

function PreviousProjects({ data, isOwner, modal }) {
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

  const projectCards = data.specialist.previousProjects.nodes
    .filter(filterProjects(state))
    .filter((p) => !!p.excerpt || p.draft)
    .map((p) => {
      // Masonry Layout can't track Project changes,
      // so we include draft status in key param to trigger updates
      return <ProjectCard key={`${p.id}-${p.draft}`} project={p} />;
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
              variant="skill"
              key="skills-section"
              sectionName="skills"
              sectionTags={state.skillsSection}
              onClick={switchSkillSelection}
            />
          )}
          {state.hasIndustries && (
            <Tags
              variant="industry"
              key="industries-section"
              sectionName="industries"
              sectionTags={state.industriesSection}
              onClick={switchIndustrySelection}
            />
          )}
        </Filter>
      )}
      <Box>
        <SectionHeaderWrapper>
          <SectionHeaderText>Previous Projects</SectionHeaderText>
        </SectionHeaderWrapper>
        {projectCards.length ? (
          <Masonry columns={numOfColumns}>
            {isOwner ? <AddPreviousProjectButton modal={modal} /> : null}
            {projectCards}
          </Masonry>
        ) : (
          <NoFilteredProjects firstName={data.specialist.firstName} />
        )}
      </Box>
    </Box>
  );
}

export default PreviousProjects;
