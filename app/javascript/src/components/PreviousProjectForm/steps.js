import ClientDetails from "./ClientDetails";
import IndustryAndSkills from "./IndustryAndSkills";
import Description from "./Description";
import VerificationDetails from "./VerificationDetails";

const STEPS = [
  {
    path: "/new_project/client",
    component: ClientDetails,
  },
  {
    path: "/new_project/skills",
    component: IndustryAndSkills,
  },
  {
    path: "/new_project/description",
    component: Description,
  },
  {
    path: "/new_project/verify",
    component: VerificationDetails,
  },
];

// Takes the steps and prefixes them with another path.
export const buildSteps = prefix => {
  return STEPS.map(step => ({
    ...step,
    path: `${prefix}${step.path}`,
  }));
};

export default STEPS;
