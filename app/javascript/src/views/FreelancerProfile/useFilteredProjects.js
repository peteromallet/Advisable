import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { isArray, intersection } from "lodash";

function useFilteredProjects(data) {
  const location = useLocation();

  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  const filteredSkills = queryParams.skills;
  const filteredIndustry = queryParams.industry;

  const projects = data.specialist.profileProjects.nodes.filter(project => {
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

  return projects;
}

export default useFilteredProjects;
