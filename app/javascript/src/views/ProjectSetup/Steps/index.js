import find from "lodash/find";
import filter from "lodash/filter";
import { matchPath } from 'react-router-dom'
import Terms from "./Terms";
import Deposit from "./Deposit";
import Questions from "./Questions";
import ProjectSkill from './ProjectSkill';
import ProjectGoals from "./ProjectGoals";
import CompanyOverview from "./CompanyOverview";
import ProjectOverview from "./ProjectOverview";
import SpecialistOverview from "./SpecialistOverview";
import SubmitConfirmation from "./SubmitConfirmation";
import MustHaveCharacteristics from "./MustHaveCharacteristics";
import NiceToHaveCharacteristics from "./NiceToHaveCharacteristics";

// The list of various steps throughout the project setup flow. Each step must
// have a path and component key. The path is the absolute path for the step
// and the component is the component that should be rendered when the user
// is on that step.
//
// Each step can also have a "title" key which when set will render the setup
// wizard header and progress bar. If no titl is present the setup flow header
// will not be rendered for that step.
//
// A step can contain an 'enabled' key which should be a function that receives
// the project as a paramter and returns true or false. If returns false then
// the step will be exluded from the setup flow.
const STEPS = [
  {
    exact: true,
    title: "What skill are you looking for?",
    path: "/project_setup",
    component: ProjectSkill,
    enabled: project => !project
  },
  {
    title: "What skill are you looking for?",
    exact: true,
    path: "/project_setup/:projectID",
    component: ProjectSkill,
    enabled: project => project
  },
  {
    title: "Company Overview",
    path: "/project_setup/:projectID/company_overview",
    component: CompanyOverview,
  },
  {
    title: "Project Overview",
    path: "/project_setup/:projectID/project_overview",
    component: ProjectOverview
  },
  {
    title: "Project Goals",
    path: "/project_setup/:projectID/goals",
    component: ProjectGoals
  },
  {
    title: "Specialist Overview",
    path: "/project_setup/:projectID/specialist_overview",
    component: SpecialistOverview
  },
  {
    title: "Must-have Characteristics",
    path: "/project_setup/:projectID/must_have",
    component: MustHaveCharacteristics
  },
  {
    title: "Nice-to-have Characteristics",
    path: "/project_setup/:projectID/nice_to_have",
    component: NiceToHaveCharacteristics
  },
  {
    title: "Qualification Questions",
    path: "/project_setup/:projectID/questions",
    component: Questions
  },
  {
    title: "Terms & Conditions",
    path: "/project_setup/:projectID/terms",
    component: Terms
  },
  {
    title: "Recruitement Deposit",
    path: "/project_setup/:projectID/deposit",
    component: Deposit,
    enabled: project => project && project.depositOwed > 0
  },
  {
    path: "/project_setup/:projectID/confirm",
    component: SubmitConfirmation
  }
];

// Returns an array of steps for a given project. Any steps that have an
// 'enabled' function that returns false will be excluded.
export const stepsForProject = project => {
  return filter(STEPS, route => {
    if (route.enabled) {
      return route.enabled(project);
    }
    return true;
  });
};

// Returns the route config for the current step based on the current URL
export const currentStep = () => {
  return find(STEPS, route => {
    return matchPath(window.location.pathname, {
      path: route.path,
      exact: route.exact,
    })
  });
};

export default STEPS