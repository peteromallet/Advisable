import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@advisable/donut";
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

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        {steps.map((step) => {
          return (
            <Route key={step.path} exact={step.exact} path={step.path}>
              <Card
                as={motion.div}
                padding="52px"
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                initial={{ y: 80, opacity: 0 }}
                exit={{
                  y: -80,
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
            {project.status === "Pending Advisable Confirmation" ? (
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
