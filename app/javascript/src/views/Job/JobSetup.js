import React from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { padding } from "styled-system";
import { Box, Card } from "@advisable/donut";
import { Switch, Route, Link, useLocation, useParams } from "react-router-dom";
import MultistepMenu from "../../components/MultistepMenu";
import JobSkills from "./JobSkills";
import JobLocation from "./JobLocation";
import JobDescription from "./JobDescription";
import JobExperience from "./JobExperience";
import JobPrimarySkill from "./JobPrimarySkill";
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

const steps = [
  {
    path: "/jobs/:id",
    exact: true,
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
];

export default function JobSetup({ data }) {
  const { id } = useParams();
  const location = useLocation();

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
          <MultistepMenu>
            <MultistepMenu.Item isComplete to={`/jobs/${id}`} exact>
              Skills
            </MultistepMenu.Item>
            <MultistepMenu.Item to={`/jobs/${id}/location`}>
              Location
            </MultistepMenu.Item>
            <MultistepMenu.Item isDisabled to={`/jobs/${id}/characteristics`}>
              Characteristics
            </MultistepMenu.Item>
            <MultistepMenu.Item isDisabled to={`/jobs/${id}/description`}>
              Description
            </MultistepMenu.Item>
            <MultistepMenu.Item isDisabled to={`/jobs/${id}/results`}>
              Results
            </MultistepMenu.Item>
          </MultistepMenu>
        </Sidebar>
      </SidebarContainer>
      <Box
        mt="64px"
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
            {steps.map((step) => {
              const Component = step.component;

              return (
                <Route key={step.path} exact={step.exact} path={step.path}>
                  <Component data={data} />
                </Route>
              );
            })}
          </Switch>
        </AnimatePresence>
      </Box>
    </PageWithSidebar>
  );
}
