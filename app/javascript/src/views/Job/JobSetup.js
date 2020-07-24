import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { padding } from "styled-system";
import { Box } from "@advisable/donut";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import BackButton from "components/BackButton";
import MultistepMenu from "../../components/MultistepMenu";
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

const PageWithSidebar = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 280px;
  position: relative;
`;

const Sidebar = styled.div`
  left: 0;
  top: 60px;
  width: 280px;
  position: fixed;
  background: white;
  height: calc(100vh - 60px);
  box-shadow: 0px 1px 20px rgba(14, 31, 91, 0.04);

  ${padding};
`;

// The steps are stored in an array. Each step is essentially props for a
// react router Route component. However, a step can also have a disabled
// property which is a function that is passed the same props as the component
// and if return's true will exclude the step from the flow.
const steps = [
  {
    path: "/jobs/:id",
    exact: true,
    component: JobSkills,
  },
  {
    path: "/jobs/:id/primary_skill",
    component: JobPrimarySkill,
    disabled: ({ data }) => data.project.skills.length === 1,
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
    path: "/jobs/:id/publish",
    component: PublishJob,
  },
  {
    path: "/jobs/:id/published",
    component: JobPendingReview,
  },
];

export default function JobSetup({ data }) {
  const { id } = useParams();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const filteredSteps = steps.filter((step) => {
    if (step.disabled === undefined) return true;
    return !step.disabled({ data });
  });

  const { project } = data;

  const completeSteps = {
    skills: project.industryExperienceImportance !== null,
    location: project.locationImportance !== null,
    characteristics: project.requiredCharacteristics.length > 0,
    description: project.goals.length > 0,
    specialists: project.likelyToHire !== null,
    published: project.status === "Pending Advisable Confirmation",
  };

  return (
    <PageWithSidebar>
      <SidebarContainer>
        <Sidebar
          as={motion.div}
          padding="m"
          initial={{ opacity: 0, left: -100 }}
          animate={{ opacity: 1, left: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BackButton to="/projects" marginBottom="m" />
          <MultistepMenu>
            <MultistepMenu.Item
              to={`/jobs/${id}`}
              isComplete={completeSteps.skills}
              steps={[
                "/jobs/:id",
                "/jobs/:id/primary_skill",
                "/jobs/:id/experience",
              ]}
              exact
            >
              Skills
            </MultistepMenu.Item>
            <MultistepMenu.Item
              isDisabled={!completeSteps.skills}
              isComplete={completeSteps.location}
              to={`/jobs/${id}/location`}
            >
              Location
            </MultistepMenu.Item>
            <MultistepMenu.Item
              to={`/jobs/${id}/characteristics`}
              isDisabled={!completeSteps.location}
              isComplete={completeSteps.characteristics}
              steps={[
                "/jobs/:id/characteristics",
                "/jobs/:id/required_characteristics",
              ]}
            >
              Characteristics
            </MultistepMenu.Item>
            <MultistepMenu.Item
              isComplete={completeSteps.description}
              isDisabled={!completeSteps.characteristics}
              to={`/jobs/${id}/description`}
            >
              Description
            </MultistepMenu.Item>
            <MultistepMenu.Item
              isDisabled={!completeSteps.description}
              isComplete={completeSteps.specialists}
              to={`/jobs/${id}/likely_to_hire`}
            >
              Specialists
            </MultistepMenu.Item>
            <MultistepMenu.Item
              to={`/jobs/${id}/publish`}
              isDisabled={!completeSteps.specialists}
              isComplete={completeSteps.published}
            >
              Review
            </MultistepMenu.Item>
          </MultistepMenu>
        </Sidebar>
      </SidebarContainer>
      <Box
        my="64px"
        mx="auto"
        width="100%"
        maxWidth="680px"
        position="relative"
        as={motion.div}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, y: 40 }}
      >
        <AnimatePresence initial={false}>
          <Switch location={location} key={location.pathname}>
            {filteredSteps.map((step) => {
              const Component = step.component;

              return (
                <Route key={step.path} exact={step.exact} path={step.path}>
                  <Component data={data} />
                </Route>
              );
            })}
            <Redirect to={`/jobs/${id}`} />
          </Switch>
        </AnimatePresence>
      </Box>
    </PageWithSidebar>
  );
}
