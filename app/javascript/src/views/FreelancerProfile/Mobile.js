import React from "react";
import { Box } from "@advisable/donut";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import About from "./About";
import Reviews from "./Reviews";
import MobileTabs from "./MobileTabs";
import ProjectCard from "./ProjectCard";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";
import ProjectFilters from "./ProjectFilters";
import useFilteredProjects from "./useFilteredProjects";
import NoProjects from "./NoProjects";
import NoFilteredProjects from "./NoFilteredProjects";
import RequestConsultationButton from "./RequestConsultationButton";

function Profile({ data }) {
  return (
    <>
      <About data={data} />
      <ProfileSkills data={data} />
    </>
  );
}

function Projects({ data, projects }) {
  if (data.specialist.previousProjects.nodes.length === 0) {
    return <NoProjects data={data} />;
  }

  return (
    <>
      <ProjectFilters data={data} />
      {projects.length > 0 ? (
        projects.map((we) => (
          <Box mb="m" key={we.id}>
            <ProjectCard project={we} specialistId={data.specialist.id} />
          </Box>
        ))
      ) : (
        <NoFilteredProjects data={data} />
      )}
    </>
  );
}

function ProfileReviews({ data }) {
  return <Reviews data={data} />;
}

function FreelancerProfileMobile({ data }) {
  const id = data.specialist.id;
  const location = useLocation();
  const projects = useFilteredProjects(data);
  const hasReviews = data.specialist.reviews.length > 0;

  return (
    <>
      <ProfileImage data={data} showReviews={hasReviews} />
      <MobileTabs data={data} />
      <Box padding="m" pb="xxxl">
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
          <Redirect
            to={{
              ...location,
              pathname: `/freelancers/${id}/profile`,
            }}
          />
        </Switch>
      </Box>
      <Box
        px="s"
        bottom={0}
        height={70}
        boxShadow="s"
        width="100%"
        bg="white.9"
        display="flex"
        position="fixed"
        alignItems="center"
      >
        <RequestConsultationButton id={id}>
          Request Consultation
        </RequestConsultationButton>
      </Box>
    </>
  );
}

export default FreelancerProfileMobile;
