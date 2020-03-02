import React from "react";
import queryString from "query-string";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isArray, intersection } from "lodash";
import { useBreakpoint } from "@advisable/donut";
import NotFound, { isNotFound } from "../NotFound";
import GET_PROFILE from "./getProfile";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

function FreelancerProfile() {
  const params = useParams();
  const location = useLocation();
  const isDesktop = useBreakpoint("mUp");
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: {
      id: params.id,
    },
  });

  if (isNotFound(error)) return <NotFound />;

  if (loading) {
    return <div>loading...</div>;
  }

  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  const filteredSkills = queryParams.skills;
  const filteredIndustry = queryParams.industry;
  const projects = data.specialist.workExperience.nodes.filter(project => {
    if (filteredSkills && isArray(filteredSkills)) {
      const projectSkills = project.skills.map(s => s.name);
      const hasSkills =
        intersection(projectSkills, filteredSkills).length ===
        filteredSkills.length;
      if (!hasSkills) return false;
    }

    if (filteredIndustry) {
      if (project.industry.name !== filteredIndustry) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      {isDesktop ? (
        <Desktop data={data} projects={projects} />
      ) : (
        <Mobile data={data} projects={projects} />
      )}
    </>
  );
}

export default FreelancerProfile;
