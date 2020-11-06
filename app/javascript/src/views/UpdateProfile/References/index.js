import * as React from "react";
import { useQuery } from "@apollo/client";
import { Text } from "@advisable/donut";
import { Chunk } from 'editmode-react';
import Loading from "../../../components/Loading";
import PREVIOUS_PROJECTS from "./previousProjects";
import PreviousProjectsList from "./PreviousProjectsList";

const References = () => {
  const { data, loading, error } = useQuery(PREVIOUS_PROJECTS);

  if (loading) return <Loading />;

  return (
    <>
      <Text
        as="h2"
        color="blue900"
        fontSize="28px"
        fontWeight="semibold"
        letterSpacing="-0.02em"
        mb="s"
      >
        <Chunk identifier='previous_projects_header'>Previous Projects</Chunk>
      </Text>
      <Text lineHeight="m" color="neutral800" mb="l">
        <Chunk identifier='previouse_projects_description'>
          Previous projects are one of the most effective ways to validate your
          skills and experience. Advisable uses them to decide who to invite to
          our platform, which projects to invite them to and gives you the
          opportunity to share them with clients when you’re applying for
          projects.
        </Chunk>
      </Text>

      {!loading && !error && (
        <PreviousProjectsList
          previousProjects={data.viewer.previousProjects.nodes}
        />
      )}
    </>
  );
};

export default References;
