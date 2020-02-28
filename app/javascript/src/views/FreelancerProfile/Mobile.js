import React from "react";
import { Box, RoundedButton, Icon } from "@advisable/donut";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import About from "./About";
import Reviews from "./Reviews";
import MobileTabs from "./MobileTabs";
import ProjectCard from "./ProjectCard";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";
import ProjectFilters from "./ProjectFilters";

function Profile({ data }) {
  return (
    <>
      <About data={data} />
      <ProfileSkills data={data} />
    </>
  );
}

function Projects({ data, projects }) {
  return (
    <>
      <ProjectFilters data={data} />
      {projects.map(we => (
        <Box mb="m" key={we.id}>
          <ProjectCard project={we} />
        </Box>
      ))}
    </>
  );
}

function ProfileReviews({ data }) {
  return <Reviews data={data} />;
}

function FreelancerProfileMobile({ data, projects }) {
  const id = data.specialist.id;

  return (
    <>
      <ProfileImage data={data} />
      <MobileTabs data={data} />
      <Box padding="m" pb="xxl">
        <Switch>
          <Route
            path={`/freelancers/${id}/profile`}
            render={() => <Profile data={data} />}
          />
          <Route
            path={`/freelancers/${id}/projects`}
            render={() => <Projects data={data} projects={projects} />}
          />
          <Route
            path={`/freelancers/${id}/reviews`}
            render={() => <ProfileReviews data={data} />}
          />
          <Redirect to={`/freelancers/${id}/profile`} />
        </Switch>
      </Box>
      <Box
        px="s"
        bottom={0}
        height={60}
        boxShadow="s"
        width="100%"
        bg="white.9"
        display="flex"
        position="fixed"
        alignItems="center"
      >
        <RoundedButton
          size="l"
          as={Link}
          fullWidth
          to={`/request_consultation/${id}`}
          prefix={<Icon icon="message-circle" />}
        >
          Request Consultation
        </RoundedButton>
      </Box>
    </>
  );
}

export default FreelancerProfileMobile;
