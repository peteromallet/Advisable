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

const PageWithSidebar = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 240px;
  position: relative;
`;

const Sidebar = styled.div`
  left: 0;
  top: 60px;
  width: 240px;
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
    path: "/jobs/:id/description",
    component: JobDescription,
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
        >
          <MultistepMenu>
            <MultistepMenu.Item to={`/jobs/${id}`}>Skills</MultistepMenu.Item>
            <MultistepMenu.Item to={`/jobs/${id}/location`}>
              Location
            </MultistepMenu.Item>
            <MultistepMenu.Item to={`/jobs/${id}/characteristics`}>
              Characteristics
            </MultistepMenu.Item>
            <MultistepMenu.Item to={`/jobs/${id}/description`}>
              Description
            </MultistepMenu.Item>
            <MultistepMenu.Item to={`/jobs/${id}/results`}>
              Results
            </MultistepMenu.Item>
          </MultistepMenu>
        </Sidebar>
      </SidebarContainer>
      <Box
        mt="64px"
        mx="auto"
        width="100%"
        maxWidth="640px"
        position="relative"
        as={motion.div}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, y: 40 }}
      >
        <AnimatePresence initial={false}>
          <Switch location={location} key={location.pathname}>
            {steps.map((step) => {
              const Component = step.component;

              return (
                <Route key={step.path} exact={step.exact} path={step.path}>
                  <Card
                    as={motion.div}
                    padding="xl"
                    width="100%"
                    overflow="hidden"
                    style={{ position: "relative" }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, x: -100, position: "absolute" }}
                  >
                    <Component data={data} />
                  </Card>
                </Route>
              );
            })}
          </Switch>
        </AnimatePresence>
      </Box>
    </PageWithSidebar>
  );
}
