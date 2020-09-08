import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { isArray, some } from "lodash-es";

function useFilteredProjects(data) {
  const location = useLocation();

  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  const filteredSkills = queryParams.skills;
  const filteredIndustries = queryParams.industries;

  const projects = data.specialist.profileProjects.filter((project) => {
    let include = true;

    if (filteredSkills && isArray(filteredSkills)) {
      const hasSkill = some(project.skills, (s) => {
        return filteredSkills.indexOf(s.name) > -1;
      });

      if (hasSkill === false) {
        include = false;
      }
    }

    if (filteredIndustries && isArray(filteredIndustries)) {
      const hasIndustry = some(project.industries, (i) => {
        return filteredIndustries.indexOf(i.name) > -1;
      });

      if (hasIndustry === false) {
        include = false;
      }
    }

    return include;
  });

  return projects;
}

export default useFilteredProjects;
