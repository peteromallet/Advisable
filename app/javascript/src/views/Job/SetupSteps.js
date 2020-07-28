import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint, Card } from "@advisable/donut";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import JobSkills from "./JobSkills";
import PublishJob from "./PublishJob";
import JobLocation from "./JobLocation";
import JobDescription from "./JobDescription";
import JobExperience from "./JobExperience";
import JobPrimarySkill from "./JobPrimarySkill";
import JobPendingReview from "./JobPendingReview";
import JobCharacteristics from "./JobCharacteristics";
import JobRequiredCharacteristics from "./JobRequiredCharacteristics";
import JobLikelyToHire from "./JobLikelyToHire";

export const setupProgress = (project) => {
  return {
    skills: project.industryExperienceImportance !== null,
    location: project.locationImportance !== null,
    characteristics: project.requiredCharacteristics.length > 0,
    description: project.goals.length > 0,
    specialists: project.likelyToHire !== null,
    published: project.status === "PENDING_REVIEW",
  };
};

// The steps are stored in an array. Each step is essentially props for a
// react router Route component.
const steps = [
  {
    path: "/jobs/:id/skills",
    component: JobSkills,
  },
  {
    path: "/jobs/:id/primary_skill",
    component: JobPrimarySkill,
  },
  {
    path: "/jobs/:id/experience",
    component: JobExperience,
  },
  {
    path: "/jobs/:id/location",
    component: JobLocation,
  },
  {
    path: "/jobs/:id/characteristics",
    component: JobCharacteristics,
  },
  {
    path: "/jobs/:id/required_characteristics",
    component: JobRequiredCharacteristics,
  },
  {
    path: "/jobs/:id/description",
    component: JobDescription,
  },
  {
    path: "/jobs/:id/likely_to_hire",
    component: JobLikelyToHire,
  },
  {
    path: "/jobs/:id/specialists",
    component: function Specialist() {
      return <>specialists</>;
    },
  },
  {
    exact: true,
    component: PublishJob,
    path: "/jobs/:id/publish",
  },
  {
    exact: true,
    path: "/jobs/:id/published",
    component: JobPendingReview,
  },
];

export default function SetupSteps({ data }) {
  const { id } = useParams();
  const location = useLocation();
  const { project } = data;
  const largeScreen = useBreakpoint("lUp");

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        {steps.map((step) => {
          return (
            <Route key={step.path} exact={step.exact} path={step.path}>
              <Card
                as={motion.div}
                padding={{ _: "0", m: "52px" }}
                elevation={{ _: "none", m: "m" }}
                variant={["transparent", "default"]}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                initial={{
                  x: largeScreen ? 0 : 80,
                  y: largeScreen ? 80 : 0,
                  opacity: 0,
                }}
                exit={{
                  y: largeScreen ? -80 : 0,
                  x: largeScreen ? 0 : -80,
                  opacity: 0,
                  zIndex: 1,
                  transition: { duration: 0.3 },
                }}
              >
                <step.component data={data} />
              </Card>
            </Route>
          );
        })}
        <Route path="/jobs/:id" exact>
          <motion.div exit={{}}>
            {project.status === "PENDING_REVIEW" ? (
              <Redirect to={`/jobs/${id}/published`} />
            ) : (
              <Redirect to={`/jobs/${id}/skills`} />
            )}
          </motion.div>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}
